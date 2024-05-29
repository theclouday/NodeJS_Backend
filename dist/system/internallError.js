"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
const http_status_1 = __importDefault(require("http-status"));
class InternalError {
    constructor(error) {
        const { message, statusText, status, } = error;
        this.status = status || http_status_1.default.INTERNAL_SERVER_ERROR;
        this.message = statusText || message || 'An unexpected error occured';
    }
}
exports.InternalError = InternalError;
