import { checkIfPgStatsActivityInstalledQuery } from "./queries";
import { PgClient } from "./utils/pgClient";


export class PlansCollector {
  private static instance: PlansCollector;
  private static connectionString: string;
  private static intervalPeriod: number;
  private static lastQueriesIdPublished: String[];
   
  private constructor () { 
  }

  private async checkIfPgStatsActivityExtensionInstalled (pgClient: PgClient) {
    try {
      return  await pgClient.queryDatabase(checkIfPgStatsActivityInstalledQuery());
    } 
    catch (error) {
      throw(error)
    }
  }

  private getPgStatsActivitiesQueriesData () {

  }

  private getPlansOfQueries () {

  }

  private storeQueryIds () {

  }

  public init(connectionString: string, intervalPeriod: number) {
      PlansCollector.connectionString = connectionString;
      PlansCollector.intervalPeriod = intervalPeriod;
  }

  public getPlans() {

  }

  public static getPlansCollector(): PlansCollector {
    if (!PlansCollector.instance) {
      PlansCollector.instance = new PlansCollector();
    }
    return PlansCollector.instance;
  }

}
