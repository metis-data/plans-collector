import { checkIfPgStatsActivityInstalledQuery, statsActivityQuery } from "./queries";
import { deepMapsCopy } from "./utils/deepMapsCopy";
import { intervalRunner } from "./utils/intervalRunner";
import { PgClient } from "./utils/pgUtils/pgClient";
import { getDatabaseFromConnectionString } from "./utils/pgUtils/pgConnectionString";

interface PlansCollectorSettings {
  connectionString: string; 
  intervalPeriod: number;
  queriesAmountLimit: number
}


export class PlansCollector {
  private static instance: PlansCollector;
  private static connectionString: string;
  private static intervalPeriod: number; // need number and measure minutes,seconds,hours
  private static queriesAmountLimit: number;
  private static database: string;
  private static  INTERVAL_BUFFER: number = 5;
  private ESTIMATED_ANALYZED_PREFIX = 'EXPLAIN (FORMAT JSON, VERBOSE)'

  private uniqueQueriesAggregation: any = new Map<string, any>();
  private uniqueQueriesPreviousAggregation: any = new Map<string, any>();

  private constructor () { 
  }

  private async checkIfPgStatsActivityExtensionInstalled () {
    try {
      const pgClient = new PgClient(PlansCollector.connectionString);
      pgClient.connectClient();
      const res : any[] =  await pgClient.queryDatabase(checkIfPgStatsActivityInstalledQuery());

      pgClient.endClient()
      if (res.length > 0) {
        return;
      }

      throw Error('Error: pg_stats_acticivity not enabled.')
    } 
    catch (error) {
      throw(error)
    }
  }

  private async getPgStatsActivitiesQueriesData(pgClient: PgClient) {
    const statsActivityData = await pgClient.queryDatabase(statsActivityQuery(PlansCollector.database, PlansCollector.queriesAmountLimit));

    statsActivityData.map((item: any) => {
      if(!this.uniqueQueriesAggregation.get(item.query_id) && !this.uniqueQueriesPreviousAggregation.get(item.query_id)) {
        this.uniqueQueriesAggregation.set(item.query_id, item)
      }
    })
  }


  private  async aggregateAllUniqueQueryIds(pgClient: PgClient) {
   
   const res = await intervalRunner(async () => {
      await this.getPgStatsActivitiesQueriesData(pgClient);

    }, PlansCollector.intervalPeriod - PlansCollector.INTERVAL_BUFFER, 1_000);
  }

  private async getPlansOfQueries (pgClient: PgClient) {
   
    

    const queryPromises = Array.from(this.uniqueQueriesAggregation).map(async ([key, value]: any) => {
      try {
        const planResult = await pgClient.queryDatabase(this.ESTIMATED_ANALYZED_PREFIX + value.query);
        // Handle the result as needed
        return { key, value, result: planResult };
      } catch (error: any) {
        console.error(`Error processing query ${key}: ${error.message}`);
        // Handle the error as needed
        return { key, value, error };
      }
    });


    this.uniqueQueriesPreviousAggregation = deepMapsCopy(this.uniqueQueriesAggregation);
    this.uniqueQueriesAggregation.clear();

    return await Promise.allSettled(queryPromises);
  }


  public init(planCollectorSettings: PlansCollectorSettings ) {
      const { connectionString, intervalPeriod, queriesAmountLimit } = {...planCollectorSettings};
      PlansCollector.connectionString = connectionString;
      PlansCollector.intervalPeriod = intervalPeriod;
      PlansCollector.queriesAmountLimit = queriesAmountLimit;
      PlansCollector.database = getDatabaseFromConnectionString(connectionString);

      this.checkIfPgStatsActivityExtensionInstalled();
  }

  public async getPlans() {
    try {
      const pgClient = new PgClient(PlansCollector.connectionString);
      pgClient.connectClient();

      await this.aggregateAllUniqueQueryIds(pgClient)
      await this.getPlansOfQueries(pgClient)


      pgClient.endClient()
    } catch (error) {
       throw(error)
    }
  }

  public static getPlansCollector(): PlansCollector {
    if (!PlansCollector.instance) {
      PlansCollector.instance = new PlansCollector();
    }
    return PlansCollector.instance;
  }

}
