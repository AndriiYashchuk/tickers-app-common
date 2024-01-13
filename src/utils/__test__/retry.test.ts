import { withRetry } from '../withRetry';

let i = 0;
let isError = true;
const error = new Error('test error');
const mockErrorHandlerCallback = jest.fn((e: Error) => {
  i++;
});
const mockDoCallback = jest.fn((): Promise<void> => {
  if (isError) return Promise.reject(error);

  return Promise.resolve();
});

it('Check retry work correctly', async () => {
  setTimeout(() => {
    isError = false;
  }, 1000);

  await withRetry(mockDoCallback, 200, mockErrorHandlerCallback);

  expect(i).toBe(5)
  expect(mockErrorHandlerCallback.mock.calls).toHaveLength(5);
  expect(mockDoCallback.mock.calls).toHaveLength(6);
  expect(mockErrorHandlerCallback.mock.calls[0][0]).toBe(error);
  expect(mockErrorHandlerCallback.mock.calls[1][0]).toBe(error);
  expect(mockErrorHandlerCallback.mock.calls[2][0]).toBe(error);
  expect(mockErrorHandlerCallback.mock.calls[3][0]).toBe(error);
  expect(mockErrorHandlerCallback.mock.calls[4][0]).toBe(error);
});
