// PlansCollector.test.ts
import { PlansCollector } from '../lib/index';

let planCollector: PlansCollector;

const connectionString = `postgresql://postgres:Trustno1@database-2.cofhrj7zmyn4.eu-central-1.rds.amazonaws.com/platform-v2`
describe('PlansCollector', () => {
  beforeAll(() => {
    // Initialize PlansCollector with mock data
     planCollector = PlansCollector.getPlansCollector();
    planCollector.init(connectionString, 30_000);
  });


  test('checkIfPgStatsActivityExtensionInstalled - ', () => {
    planCollector.
  });

  

  test('getPlansCollector returns the same instance', () => {
    const instance1 = PlansCollector.getPlansCollector();
    const instance2 = PlansCollector.getPlansCollector();

    expect(instance1).toBe(instance2);
  });

  test('init sets connectionString and intervalPeriod', () => {
    expect(PlansCollector['connectionString']).toBe('mockConnectionString');
    expect(PlansCollector['intervalPeriod']).toBe(1000);
  });

  test('someMethod prints "Singleton method called"', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    // PlansCollector.someMethod();
    expect(consoleSpy).toHaveBeenCalledWith('Singleton method called');
    consoleSpy.mockRestore();
  });

  // Add more tests for other methods as needed
});
