export declare const withRetry: <T>(doCallback: () => Promise<T>, timeout: number, errorHandler?: (e: Error) => void) => Promise<T>;
