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
exports.withRetry = void 0;
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const withRetry = (doCallback, timeout, errorHandler = console.error) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield doCallback();
    }
    catch (e) {
        errorHandler(e);
        yield wait(timeout);
        return (0, exports.withRetry)(doCallback, timeout, errorHandler);
    }
});
exports.withRetry = withRetry;
