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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erc20 = void 0;
var utils_1 = require("ethers/lib/utils");
var dist_1 = require("@phuture/contract/dist");
var types_1 = require("./types");
/** ### ERC20 Token Contract */
var Erc20 = /** @class */ (function (_super) {
    __extends(Erc20, _super);
    /**
     * ### Creates a new ERC20 instance
     *
     * @param account Account to use for interacting with the contract
     * @param contract Contract instance or address of the ERC20 token contract
     * @param factory Contract factory to use for creating the contract
     *
     * @returns New ERC20 token instance
     */
    function Erc20(account, contract, factory) {
        if (factory === void 0) { factory = types_1.ERC20__factory; }
        return _super.call(this, account, contract, factory) || this;
    }
    /**
     * ### Get the decimals of the token
     *
     * @returns Decimals of the token
     */
    Erc20.prototype.decimals = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var getDecimals, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        getDecimals = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.contract.decimals()];
                        }); }); };
                        this.on('update', getDecimals);
                        if (!((_a = this._decimals) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1:
                        _c = this;
                        return [4 /*yield*/, getDecimals()];
                    case 2:
                        _b = (_c._decimals = _d.sent());
                        _d.label = 3;
                    case 3:
                        _b;
                        return [2 /*return*/, this._decimals];
                }
            });
        });
    };
    /**
     * ### Get the symbol of the token
     *
     * @returns Symbol of the token
     */
    Erc20.prototype.symbol = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var getSymbol, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        getSymbol = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.contract.symbol()];
                        }); }); };
                        this.on('update', getSymbol);
                        if (!((_a = this._symbol) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1:
                        _c = this;
                        return [4 /*yield*/, getSymbol()];
                    case 2:
                        _b = (_c._symbol = _d.sent());
                        _d.label = 3;
                    case 3:
                        _b;
                        return [2 /*return*/, this._symbol];
                }
            });
        });
    };
    /**
     * ### Get the name of the token
     *
     * @returns Name of the token
     */
    Erc20.prototype.name = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var getName, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        getName = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.contract.name()];
                        }); }); };
                        this.on('update', getName);
                        if (!((_a = this._name) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1:
                        _c = this;
                        return [4 /*yield*/, getName()];
                    case 2:
                        _b = (_c._name = _d.sent());
                        _d.label = 3;
                    case 3:
                        _b;
                        return [2 /*return*/, this._name];
                }
            });
        });
    };
    /**
     * ### Get the formatted total supply of the token
     *
     * @returns Formatted total supply of the token
     */
    Erc20.prototype.formattedTotalSupply = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalSupply, decimals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.totalSupply()];
                    case 1:
                        totalSupply = _a.sent();
                        return [4 /*yield*/, this.decimals()];
                    case 2:
                        decimals = _a.sent();
                        return [2 /*return*/, (0, utils_1.formatUnits)(totalSupply, decimals)];
                }
            });
        });
    };
    /**
     * ### Get the formatted balance of the account
     *
     * @param account Address of the account
     *
     * @returns Formatted balance of the account
     */
    Erc20.prototype.formattedBalanceOf = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, decimals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.balanceOf(account)];
                    case 1:
                        balance = _a.sent();
                        return [4 /*yield*/, this.decimals()];
                    case 2:
                        decimals = _a.sent();
                        return [2 /*return*/, (0, utils_1.formatUnits)(balance, decimals)];
                }
            });
        });
    };
    /**
     * ### Check Allowance
     *
     * @param account Address of the account
     * @param amount Token amount
     *
     * @returns true if the account has enough tokens to transfer the amount
     */
    Erc20.prototype.checkAllowance = function (account, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var allowance, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.contract).allowance;
                        return [4 /*yield*/, this.account.address()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), account])];
                    case 2:
                        allowance = _c.sent();
                        return [2 /*return*/, allowance.gte(amount)];
                }
            });
        });
    };
    return Erc20;
}(dist_1.Contract));
exports.Erc20 = Erc20;
//# sourceMappingURL=erc-20.js.map