"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = exports.DefaultIndexRouterAddress = void 0;
var erc_20_1 = require("@phuture/erc-20");
var errors_1 = require("@phuture/errors");
var types_1 = require("@phuture/types");
var ethers_1 = require("ethers");
var contract_1 = require("@phuture/contract");
var types_2 = require("./types");
/** ### Default IndexRouter address for network */
var DefaultIndexRouterAddress;
(function (DefaultIndexRouterAddress) {
    /** ### Default IndexRouter address on mainnet. */
    DefaultIndexRouterAddress["Mainnet"] = "0x7b6c3e5486d9e6959441ab554a889099eed76290";
})(DefaultIndexRouterAddress = exports.DefaultIndexRouterAddress || (exports.DefaultIndexRouterAddress = {}));
/** ### IndexRouter Contract */
var IndexRouter = /** @class */ (function (_super) {
    __extends(IndexRouter, _super);
    /**
     * ### Creates a new IndexRouter instance
     *
     * @param account Account to use for signing
     * @param contract Contract instance or address of the IndexRouter contract
     *
     * @returns New IndexRouter token instance
     */
    function IndexRouter(account, contract) {
        if (contract === void 0) { contract = DefaultIndexRouterAddress.Mainnet; }
        return _super.call(this, account, contract, types_2.IndexRouter__factory) || this;
    }
    IndexRouter.prototype.weth = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var getWeth, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        getWeth = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.contract.WETH()];
                        }); }); };
                        this.on('change', getWeth);
                        if (!((_a = this._weth) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1:
                        _c = this;
                        return [4 /*yield*/, getWeth()];
                    case 2:
                        _b = (_c._weth = _d.sent());
                        _d.label = 3;
                    case 3:
                        _b;
                        return [2 /*return*/, this._weth];
                }
            });
        });
    };
    /**
     * ### Mint
     *
     * @param options mint options
     * @param sellAmount token's  amount
     * @param sellToken (optional) erc20 token
     * @param permitOptions (optional) permit options for transaction
     *
     * @returns mint transaction
     */
    IndexRouter.prototype.mintSwap = function (options, sellAmount, sellToken, permitOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sellToken)
                            return [2 /*return*/, this.contract.mintSwapValue(options, { value: sellAmount })];
                        if (permitOptions !== undefined)
                            return [2 /*return*/, this.contract.mintSwapWithPermit(options, permitOptions.deadline, permitOptions.v, permitOptions.r, permitOptions.s)];
                        return [4 /*yield*/, sellToken.checkAllowance(this.address, sellAmount)];
                    case 1:
                        if (!(_a.sent()))
                            throw new errors_1.InsufficientAllowanceError(sellAmount);
                        return [2 /*return*/, this.contract.mintSwap(options)];
                }
            });
        });
    };
    /**
     * ### Mint Static
     *
     * @param options mint options
     * @param sellAmount token's  amount
     * @param sellToken (optional) erc20 token
     * @param permitOptions (optional) permit options for transaction
     *
     * @returns mint amount
     */
    IndexRouter.prototype.mintSwapStatic = function (options, sellAmount, sellToken, permitOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, outputAmount_1, estimatedGas_1, _b, outputAmount_2, estimatedGas_2, _c, outputAmount, estimatedGas;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!sellToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([
                                this.contract.callStatic.mintSwapValue(options, { value: sellAmount }),
                                this.contract.estimateGas.mintSwapValue(options, { value: sellAmount })
                            ])];
                    case 1:
                        _a = __read.apply(void 0, [_d.sent(), 2]), outputAmount_1 = _a[0], estimatedGas_1 = _a[1];
                        return [2 /*return*/, { outputAmount: outputAmount_1, estimatedGas: estimatedGas_1 }];
                    case 2:
                        if (!(permitOptions !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all([
                                this.contract.callStatic.mintSwapWithPermit(options, permitOptions.deadline, permitOptions.v, permitOptions.r, permitOptions.s),
                                this.contract.estimateGas.mintSwapWithPermit(options, permitOptions.deadline, permitOptions.v, permitOptions.r, permitOptions.s),
                            ])];
                    case 3:
                        _b = __read.apply(void 0, [_d.sent(), 2]), outputAmount_2 = _b[0], estimatedGas_2 = _b[1];
                        return [2 /*return*/, { outputAmount: outputAmount_2, estimatedGas: estimatedGas_2 }];
                    case 4: return [4 /*yield*/, sellToken.checkAllowance(this.address, sellAmount)];
                    case 5:
                        if (!(_d.sent()))
                            throw new errors_1.InsufficientAllowanceError(sellAmount);
                        return [4 /*yield*/, Promise.all([
                                this.contract.callStatic.mintSwap(options),
                                this.contract.estimateGas.mintSwap(options)
                            ])];
                    case 6:
                        _c = __read.apply(void 0, [_d.sent(), 2]), outputAmount = _c[0], estimatedGas = _c[1];
                        return [2 /*return*/, { outputAmount: outputAmount, estimatedGas: estimatedGas }];
                }
            });
        });
    };
    /**
     * ### Mint Index Amount
     *
     * @param index index address
     * @param amountInInputToken token's  amount
     * @param quotes quotes for swaps
     * @param inputToken (optional) token's address
     *
     * @returns mint amount in single token
     */
    IndexRouter.prototype.mintIndexAmount = function (index, amountInInputToken, quotes, inputToken) {
        return __awaiter(this, void 0, void 0, function () {
            var option, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = {};
                        if (!(inputToken !== null && inputToken !== void 0)) return [3 /*break*/, 1];
                        _a = inputToken;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.weth()];
                    case 2:
                        _a = (_c.sent());
                        _c.label = 3;
                    case 3:
                        _b.inputToken = _a,
                            _b.amountInInputToken = amountInInputToken,
                            _b.quotes = quotes,
                            _b.index = index;
                        return [4 /*yield*/, this.account.address()];
                    case 4:
                        option = (_b.recipient = _c.sent(),
                            _b);
                        return [2 /*return*/, this.contract.mintSwapIndexAmount(option)];
                }
            });
        });
    };
    /**
     * ### Burn
     *
     * @param index index address or it's erc20 interface
     * @param amount index amount
     * @param recipient address of account to receive tokens
     * @param permitOptions permit options for transaction
     *
     * @returns burn transaction
     */
    IndexRouter.prototype.burn = function (index, amount, recipient, permitOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var indexInstance, burnParameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indexInstance = (0, types_1.isAddress)(index)
                            ? new erc_20_1.Erc20(this.account, index)
                            : index;
                        burnParameters = {
                            index: indexInstance.address,
                            amount: amount,
                            recipient: recipient,
                        };
                        if (permitOptions !== undefined)
                            return [2 /*return*/, this.contract.burnWithPermit(burnParameters, permitOptions.deadline, permitOptions.v, permitOptions.r, permitOptions.s)];
                        return [4 /*yield*/, indexInstance.checkAllowance(this.address, amount)];
                    case 1:
                        if (!(_a.sent()))
                            throw new errors_1.InsufficientAllowanceError(amount);
                        return [2 /*return*/, this.contract.burn(burnParameters)];
                }
            });
        });
    };
    /**
     * ### Burn Swap
     *
     * @param index index address or it's erc20 interface
     * @param amount index amount
     * @param recipient signer's address
     * @param options burn swap options
     *
     * @returns burn swap transaction
     */
    IndexRouter.prototype.burnSwap = function (index, amount, recipient, options) {
        return __awaiter(this, void 0, void 0, function () {
            var indexInstance, burnParameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indexInstance = (0, types_1.isAddress)(index)
                            ? new erc_20_1.Erc20(this.account, index)
                            : index;
                        burnParameters = {
                            index: indexInstance.address,
                            amount: amount,
                            recipient: recipient,
                            quotes: options.quotes,
                            outputAsset: '',
                        };
                        if (!(options.outputAsset === undefined)) return [3 /*break*/, 2];
                        if (options.permitOptions !== undefined)
                            return [2 /*return*/, this.contract.burnSwapValueWithPermit(burnParameters, options.permitOptions.deadline, options.permitOptions.v, options.permitOptions.r, options.permitOptions.s)];
                        return [4 /*yield*/, indexInstance.checkAllowance(this.address, amount)];
                    case 1:
                        if (!(_a.sent()))
                            throw new errors_1.InsufficientAllowanceError(amount);
                        return [2 /*return*/, this.contract.burnSwapValue(burnParameters)];
                    case 2:
                        burnParameters.outputAsset = options.outputAsset;
                        if (options.permitOptions !== undefined)
                            return [2 /*return*/, this.contract.burnSwapWithPermit(burnParameters, options.permitOptions.deadline, options.permitOptions.v, options.permitOptions.r, options.permitOptions.s)];
                        return [4 /*yield*/, indexInstance.checkAllowance(this.address, amount)];
                    case 3:
                        if (!(_a.sent()))
                            throw new errors_1.InsufficientAllowanceError(amount);
                        return [2 /*return*/, this.contract.burnSwap(burnParameters)];
                }
            });
        });
    };
    /**
     * ### Burn Swap Static
     *
     * @param index index address or it's erc20 interface
     * @param amount index amount
     * @param recipient signer's address
     * @param options burn swap options
     *
     * @returns burn swap amount
     */
    IndexRouter.prototype.burnSwapStatic = function (index, amount, recipient, options) {
        return __awaiter(this, void 0, void 0, function () {
            var indexInstance, burnParameters, _a, outputAmount_3, estimatedGas_3, _b, outputAmount_4, estimatedGas_4, _c, outputAmount_5, estimatedGas_5, _d, outputAmount, estimatedGas;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        indexInstance = (0, types_1.isAddress)(index)
                            ? new erc_20_1.Erc20(this.account, index)
                            : index;
                        burnParameters = {
                            index: indexInstance.address,
                            amount: amount,
                            recipient: recipient,
                            quotes: options.quotes,
                            outputAsset: '',
                        };
                        if (!(options.outputAsset === undefined)) return [3 /*break*/, 5];
                        if (!(options.permitOptions !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([
                                this.contract.callStatic.burnSwapValueWithPermit(burnParameters, options.permitOptions.deadline, options.permitOptions.v, options.permitOptions.r, options.permitOptions.s),
                                this.contract.estimateGas.burnSwapValueWithPermit(burnParameters, options.permitOptions.deadline, options.permitOptions.v, options.permitOptions.r, options.permitOptions.s),
                            ])];
                    case 1:
                        _a = __read.apply(void 0, [_e.sent(), 2]), outputAmount_3 = _a[0], estimatedGas_3 = _a[1];
                        return [2 /*return*/, { outputAmount: outputAmount_3, estimatedGas: estimatedGas_3 }];
                    case 2: return [4 /*yield*/, indexInstance.checkAllowance(this.address, amount)];
                    case 3:
                        if (!(_e.sent()))
                            throw new errors_1.InsufficientAllowanceError(amount);
                        return [4 /*yield*/, Promise.all([
                                this.contract.callStatic.burnSwapValue(burnParameters),
                                this.contract.estimateGas.burnSwapValue(burnParameters),
                            ])];
                    case 4:
                        _b = __read.apply(void 0, [_e.sent(), 2]), outputAmount_4 = _b[0], estimatedGas_4 = _b[1];
                        return [2 /*return*/, { outputAmount: outputAmount_4, estimatedGas: estimatedGas_4 }];
                    case 5:
                        burnParameters.outputAsset = options.outputAsset;
                        if (!(options.permitOptions !== undefined)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Promise.all([
                                this.contract.callStatic.burnSwapWithPermit(burnParameters, options.permitOptions.deadline, options.permitOptions.v, options.permitOptions.r, options.permitOptions.s),
                                this.contract.estimateGas.burnSwapWithPermit(burnParameters, options.permitOptions.deadline, options.permitOptions.v, options.permitOptions.r, options.permitOptions.s),
                            ])];
                    case 6:
                        _c = __read.apply(void 0, [_e.sent(), 2]), outputAmount_5 = _c[0], estimatedGas_5 = _c[1];
                        return [2 /*return*/, { outputAmount: outputAmount_5, estimatedGas: estimatedGas_5 }];
                    case 7: return [4 /*yield*/, indexInstance.checkAllowance(this.address, amount)];
                    case 8:
                        if (!(_e.sent()))
                            throw new errors_1.InsufficientAllowanceError(amount);
                        return [4 /*yield*/, Promise.all([
                                this.contract.callStatic.burnSwap(burnParameters),
                                this.contract.estimateGas.burnSwap(burnParameters),
                            ])];
                    case 9:
                        _d = __read.apply(void 0, [_e.sent(), 2]), outputAmount = _d[0], estimatedGas = _d[1];
                        return [2 /*return*/, { outputAmount: outputAmount, estimatedGas: estimatedGas }];
                }
            });
        });
    };
    /**
     * ### Burn amount
     *
     * @param index index address
     * @param amount index amount
     * @param prices (optional) prices
     *
     * @returns burn amount in single token or total from array of tokens
     */
    IndexRouter.prototype.burnAmount = function (index, amount, prices) {
        return __awaiter(this, void 0, void 0, function () {
            var amounts, totalAmount, _a, _b, _c, index_1, amount_1;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.contract.burnTokensAmount(index, amount)];
                    case 1:
                        amounts = _e.sent();
                        if (!prices) {
                            return [2 /*return*/, amounts];
                        }
                        totalAmount = ethers_1.BigNumber.from(0);
                        try {
                            for (_a = __values(amounts.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = __read(_b.value, 2), index_1 = _c[0], amount_1 = _c[1];
                                totalAmount = totalAmount.add(amount_1).mul(prices[index_1]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, totalAmount];
                }
            });
        });
    };
    return IndexRouter;
}(contract_1.Contract));
exports.IndexRouter = IndexRouter;
//# sourceMappingURL=index-router.js.map