// Write a function defaultArguments . It takes a function as an argument, along with an
// object containing default values for that function's arguments, and returns another function
// which defaults to the right values.
//
// Requirements:
// - You cannot assume that the function's arguments have any particular names.
// - You should be able to call defaultArguments repeatedly to change the defaults.

export async function retryFailures<T>(
  fn: () => Promise<T>,
  retries: number
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    return await retryFailures(fn, retries - 1);
  }
}

export function createTargetFunction(succeedsOnAttempt: number) {
  let attempt = 0;

  return async () => {
    if (++attempt === succeedsOnAttempt) {
      return attempt;
    }

    throw Object.assign(new Error(`failure`), { attempt });
  };
}
