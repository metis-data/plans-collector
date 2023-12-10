declare class PlansCollector {
  private static instance: PlansCollector;
  private static connectionString: string;
  private static intervalPeriod: number;
  private static lastQueriesIdPublished: string[];

  private constructor();

  private checkIfPgStatsActivityExtensionInstalled(): void;
  private getPgStatsActivitiesQueriesData(): void;
  private getPlansOfQueries(): void;
  private storeQueryIds(): void;

  public init(connectionString: string, intervalPeriod: number): void;
  public getPlans(): void;

  public static getPlansCollector(): PlansCollector;
  public someMethod(): void;
}

declare const plansCollectorInstance: PlansCollector;

export default plansCollectorInstance;
