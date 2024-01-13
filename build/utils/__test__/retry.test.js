"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const withRetry_1 = require("../withRetry");
let i = 0;
let isError = true;
const error = new Error('test error');
const mockErrorHandlerCallback = jest.fn((e) => {
    i++;
});
const mockDoCallback = jest.fn(() => {
    if (isError)
        return Promise.reject(error);
    return Promise.resolve();
});
it('Check retry work correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => {
        isError = false;
    }, 1000);
    yield (0, withRetry_1.withRetry)(mockDoCallback, 200, mockErrorHandlerCallback);
    expect(i).toBe(5);
    expect(mockErrorHandlerCallback.mock.calls).toHaveLength(5);
    expect(mockDoCallback.mock.calls).toHaveLength(6);
    expect(mockErrorHandlerCallback.mock.calls[0][0]).toBe(error);
    expect(mockErrorHandlerCallback.mock.calls[1][0]).toBe(error);
    expect(mockErrorHandlerCallback.mock.calls[2][0]).toBe(error);
    expect(mockErrorHandlerCallback.mock.calls[3][0]).toBe(error);
    expect(mockErrorHandlerCallback.mock.calls[4][0]).toBe(error);
}));
