


export function intervalRunner(callback: any, totalRuns: number, intervalDuration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    let counter = 0;

    const intervalId = setInterval(() => {
      callback(counter + 1);

      counter++;

      if (counter === totalRuns) {
        clearInterval(intervalId);
        resolve(); // Resolve the promise when the interval is complete
      }
    }, intervalDuration);

    // Optionally set a timeout to ensure the interval doesn't run indefinitely
    const maxDuration = totalRuns * intervalDuration; // Adjust as needed
    setTimeout(() => {
      clearInterval(intervalId);
      resolve(); // Resolve the promise in case of a timeout
    }, maxDuration);
  });
}