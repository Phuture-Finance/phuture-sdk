"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
var node_process_1 = __importDefault(require("node:process"));
var getEnv = function (key) {
    var value = node_process_1.default.env[key];
    if (!value)
        throw new Error("Missing environment variable ".concat(key));
    return value;
};
exports.getEnv = getEnv;
//# sourceMappingURL=utils.js.map