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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
var erc_20_1 = require("@phuture/erc-20");
var ethers_1 = require("ethers");
var types_1 = require("./types");
var subraph_repository_1 = require("./subraph.repository");
/**
 * ### Index Contract
 */
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    /**
     * ### Creates a new Index instance
     *
     * @param account Account to use for interacting with the contract
     * @param contract Contract instance or address of the Index token contract
     * @param factory Contract factory to use for creating the contract
     *
     * @returns New Index token instance
     */
    function Index(account, contract, factory) {
        if (factory === void 0) { factory = types_1.BaseIndex__factory; }
        var _this = _super.call(this, account, contract, factory) || this;
        _this._indexRepo = subraph_repository_1.subgraphIndexRepo;
        return _this;
    }
    /**
     * ### Connect repository to Index
     *
     * @param {IndexRepo} indexRepo Repository to connect to Index
     *
     * @returns {this} Index instance
     */
    Index.prototype.withRepo = function (indexRepo) {
        this._indexRepo = indexRepo;
        return this;
    };
    /**
     * ### Connect price source to Index
     *
     * @param {IndexRepo} priceSource Price source to connect to Index
     *
     * @returns {this} Index instance
     */
    Index.prototype.withPriceSource = function (priceSource) {
        this._priceSource = priceSource;
        return this;
    };
    /**
     * ### Scale amount of input tokens to set underlying tokens amount
     *
     * @param amountDesired Amount of input tokens to scale
     */
    Index.prototype.scaleAmount = function (amountDesired) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _assets, _weights, amountToSell, amounts, _b, _c, _d, index, asset;
            var e_1, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.contract.anatomy()];
                    case 1:
                        _a = _f.sent(), _assets = _a._assets, _weights = _a._weights;
                        amountToSell = ethers_1.BigNumber.from(0);
                        amounts = {};
                        try {
                            for (_b = __values(_assets.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                _d = __read(_c.value, 2), index = _d[0], asset = _d[1];
                                amounts[asset] = ethers_1.BigNumber.from(amountDesired)
                                    .mul(_weights[index])
                                    .div(255);
                                amountToSell = amountToSell.add(amounts[asset]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, { amountToSell: amountToSell, amounts: amounts }];
                }
            });
        });
    };
    /**
     * ### Get holders of the index
     *
     * @returns {Promise<Address[]>} Holders of the index
     */
    Index.prototype.holders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._indexRepo.holders(this.address)];
            });
        });
    };
    /**
     * ### Get holders count of the index
     *
     * @returns {Promise<number>} Count of holders of the index
     */
    Index.prototype.holdersCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._indexRepo.holdersCount(this.address)];
            });
        });
    };
    /**
     * ### Get price of the index
     *
     * @param {Address} sellToken Token to sell
     * @param {BigNumberish} sellAmount Amount of tokens to sell
     *
     * @returns {Promise<BigNumber>} Price of the index in sellToken
     */
    Index.prototype.price = function (sellToken, sellAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._priceSource)
                    throw new Error('No price source');
                return [2 /*return*/, this._priceSource.price(this.address, sellToken, sellAmount)];
            });
        });
    };
    /**
     * ### Get price of the index
     *
     * @returns {Promise<BigNumber>} Price of the index in sellToken
     */
    Index.prototype.priceEth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._indexRepo.priceEth(this.address)];
            });
        });
    };
    /**
     * ### Get market cap of the index
     *
     * @param {Address} sellToken Token to sell
     *
     * @returns {Promise<BigNumber>} Market cap of the index in sellToken
     */
    Index.prototype.marketCap = function (sellToken) {
        return __awaiter(this, void 0, void 0, function () {
            var price, _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!this._priceSource)
                            throw new Error('No price source');
                        _b = (_a = this._priceSource).price;
                        _c = [this.address,
                            sellToken];
                        _e = (_d = ethers_1.BigNumber.from(10)).mul;
                        return [4 /*yield*/, this.decimals()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_e.apply(_d, [_h.sent()])]))];
                    case 2:
                        price = _h.sent();
                        _g = (_f = price).mul;
                        return [4 /*yield*/, this.contract.totalSupply()];
                    case 3: return [2 /*return*/, _g.apply(_f, [_h.sent()])];
                }
            });
        });
    };
    /**
     * ### Get fees of the index
     *
     * @returns {Promise<Fees>} Fees of the index
     */
    Index.prototype.fees = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._indexRepo.fees(this.address)];
            });
        });
    };
    return Index;
}(erc_20_1.Erc20Permit));
exports.Index = Index;
//# sourceMappingURL=base-index.js.map