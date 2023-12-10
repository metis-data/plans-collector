// PlansCollector.test.ts
import { PlansCollector } from '../lib/index';



const connectionString = `וYOUR CONNECTION STRING`
describe('PlansCollector', () => {
  let planCollector: PlansCollector;
  beforeAll(() => {
    // Initialize PlansCollector with mock data
     planCollector = PlansCollector.getPlansCollector();
    planCollector.init(
      {    
          connectionString: connectionString,
          intervalPeriod: 10,
          queriesAmountLimit: 1000    
      }
    )
  });


  test('getPlansCollector returns the same instance', async () => {
   

      // Function to call getPlans and return the instance
  const getPlansAndReturnInstance = async () => {
    return await planCollector.getPlans();
  };

  // Call getPlans multiple times with a delay
  const instances = await Promise.all(Array.from({ length: 3 }, (_, i) => {
    const delay = i * 10000; // 10 seconds delay for each iteration
    return new Promise((resolve) => {
      setTimeout(async () => {
        const instance = await getPlansAndReturnInstance();
        resolve(instance);
      }, delay);
    });
  }));
   

    // expect(instance1).toBe(instance2);
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
