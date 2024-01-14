const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const withRetry = async<T>(
  doCallback: () => Promise<T>,
  timeout: number,
  errorHandler: (e: Error) => void = console.error
): Promise<T> => {
  try{
    return await doCallback();
  } catch (e: unknown){
    errorHandler(e as Error);
    await wait(timeout);

    return withRetry(doCallback, timeout, errorHandler)
  }
}

