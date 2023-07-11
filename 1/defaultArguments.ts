// Implement an asynchronous function retryFailures which accepts two parameters:
// 
// Requirements:
// - An asynchronous target function to call
// - A number of retries it will make
//
// Your function will have to keep calling target function until it resolves to a value or
// number of retries reaches retries parameter. Upon reaching max number of
// retries allowed, retryFunction should throw last error thrown by
// target function.

type Func = (...args: any[]) => any;

export function defaultArguments(
  func: Func,
  defaultArgs: { [key: string]: any }
): Func {
  return function (...args: any[]): any {
    const passedArgs = args.reduceRight((acc, val, index) => {
      if (!(index in defaultArgs)) {
        acc[index] = val;
      }
      return acc;
    }, {});

    const mergedArgs = { ...defaultArgs, ...passedArgs };

    return func(...Object.values(mergedArgs));
  };
}