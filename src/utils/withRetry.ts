const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const withRetry = async<T>(
  doCallback: () => Promise<T>,
  timeout: number,
  errorHandler: (e: Error) => void = console.error
): Promise<T> => {
  try{
    return await doCallback();
  } catch (e){
    errorHandler(e);
    await wait(timeout);
    return withRetry(doCallback, timeout, errorHandler)
  }
}

