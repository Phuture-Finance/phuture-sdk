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
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ethers_1 = require("ethers");
var moq_ts_1 = require("moq.ts");
var src_1 = require("../src");
describe("Index", function () {
    var account = new moq_ts_1.Mock().object();
    var contractAddress = "0xf9ccb834adbe4591fd517aa69a24bf97d1386092";
    var indexContract;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            indexContract = new moq_ts_1.Mock()
                .setup(function (c) { return c.address; })
                .returns(contractAddress)
                .setup(function (c) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, c.anatomy()];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            }); }); })
                .returnsAsync({ _assets: ["0x01", "0x02"], _weights: [155, 100] })
                .object();
            return [2 /*return*/];
        });
    }); });
    it("create Index instance from address", function () {
        var index = new src_1.Index(account, indexContract);
        (0, chai_1.expect)(index.address).to.be.eq(indexContract);
    });
    describe("Index constructed", function () {
        var index = new src_1.Index(account, indexContract);
        it("#scaleAmount returns proper values", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, amounts, amountToSell;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, index.scaleAmount(10000000000)];
                    case 1:
                        _a = _b.sent(), amounts = _a.amounts, amountToSell = _a.amountToSell;
                        (0, chai_1.expect)(amounts).to.deep.eq({
                            "0x01": ethers_1.BigNumber.from(6078431372),
                            "0x02": ethers_1.BigNumber.from(3921568627),
                        });
                        (0, chai_1.expect)(amountToSell.toNumber()).to.eq(9999999999);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=index.test.js.map