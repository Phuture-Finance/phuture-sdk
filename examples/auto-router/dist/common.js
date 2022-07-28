"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoRouter = void 0;
var ethers_1 = require("ethers");
var _0x_aggregator_1 = require("packages/0x-aggregator-");
var index_router_1 = require("packages/index-router-");
var auto_router_1 = require("packages/auto-router-");
var dotenv_1 = __importDefault(require("dotenv"));
var utils_1 = require("./utils");
var account_1 = require("packages/account-");
dotenv_1.default.config();
var account = new account_1.Account(new ethers_1.ethers.Wallet((0, utils_1.getEnv)('PRIVATE_KEY'), new ethers_1.ethers.providers.JsonRpcProvider((0, utils_1.getEnv)('NODE_URL'))));
var zeroEx = new _0x_aggregator_1.ZeroExAggregator((0, utils_1.getEnv)('ZERO_EX_AGGREGATOR_URL'));
var indexRouter = new index_router_1.IndexRouter(account, (0, utils_1.getEnv)('INDEX_ROUTER_ADDRESS'));
exports.autoRouter = new auto_router_1.AutoRouter(indexRouter, zeroEx);
//# sourceMappingURL=common.js.map
