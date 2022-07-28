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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_process_1 = __importDefault(require("node:process"));
var _0x_aggregator_1 = require("packages/0x-aggregator-");
var index_1 = require("packages/index-");
var index_router_1 = require("packages/index-router-");
var dotenv_1 = __importDefault(require("dotenv"));
var ethers_1 = require("ethers");
var account_1 = require("packages/account-");
dotenv_1.default.config();
/**
 * This example looks at minting 1ETH
 */
var amountToSellDesired = ethers_1.BigNumber.from(ethers_1.utils.parseEther('1'));
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var privateKey, nodeUrl, account, indexAddress, index, _a, amounts, amountToSell, zeroExAggregatorUrl, zeroEx, quotes, indexRouterAddress, indexRouter, _b, _c;
        var _d;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    privateKey = node_process_1.default.env.PRIVATE_KEY;
                    if (!privateKey)
                        throw new Error('PRIVATE_KEY is not set');
                    nodeUrl = node_process_1.default.env.NODE_URL;
                    if (!nodeUrl)
                        throw new Error('NODE_URL is not set');
                    account = new account_1.Account(new ethers_1.ethers.Wallet(privateKey, new ethers_1.ethers.providers.JsonRpcProvider(nodeUrl)));
                    indexAddress = node_process_1.default.env.INDEX_ADDRESS;
                    if (!indexAddress)
                        throw new Error('INDEX_ADDRESS is not set');
                    index = new index_1.Index(account, indexAddress);
                    return [4 /*yield*/, index.scaleAmount(amountToSellDesired)];
                case 1:
                    _a = _e.sent(), amounts = _a.amounts, amountToSell = _a.amountToSell;
                    zeroExAggregatorUrl = node_process_1.default.env.ZERO_EX_AGGREGATOR_URL;
                    if (!zeroExAggregatorUrl)
                        throw new Error('ZERO_EX_AGGREGATOR_URL is not set');
                    zeroEx = new _0x_aggregator_1.ZeroExAggregator(zeroExAggregatorUrl);
                    return [4 /*yield*/, Promise.all(Object.entries(amounts).map(function (_a) {
                            var asset = _a[0], amount = _a[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                var _b, buyAssetMinAmount, swapTarget, assetQuote;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, zeroEx.quote('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
                                            asset, amount)];
                                        case 1:
                                            _b = _c.sent(), buyAssetMinAmount = _b.buyAmount, swapTarget = _b.to, assetQuote = _b.data;
                                            return [2 /*return*/, {
                                                    asset: asset,
                                                    swapTarget: swapTarget,
                                                    buyAssetMinAmount: buyAssetMinAmount,
                                                    assetQuote: assetQuote,
                                                }];
                                    }
                                });
                            });
                        }))];
                case 2:
                    quotes = _e.sent();
                    indexRouterAddress = node_process_1.default.env.INDEX_ROUTER_ADDRESS;
                    if (!indexRouterAddress)
                        throw new Error('INDEX_ROUTER_ADDRESS is not set');
                    indexRouter = new index_router_1.IndexRouter(account, indexRouterAddress);
                    _c = (_b = indexRouter).mintSwap;
                    _d = {
                        index: index.address
                    };
                    return [4 /*yield*/, account.address()];
                case 3:
                /**
                 * Once we have our quotes in the form of an array of {@see Zero0xQuoteResponse}
                 * We can then perform the mint.
                 */
                return [4 /*yield*/, _c.apply(_b, [(_d.recipient = _e.sent(),
                            _d.quotes = quotes,
                            _d), amountToSell])];
                case 4:
                    /**
                     * Once we have our quotes in the form of an array of {@see Zero0xQuoteResponse}
                     * We can then perform the mint.
                     */
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error(error);
});
//# sourceMappingURL=mint-swap-value.js.map
