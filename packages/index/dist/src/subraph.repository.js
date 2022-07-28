"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.subgraphIndexRepo = exports.SubgraphIndexRepo = void 0;
var subgraph_1 = require("@phuture/subgraph");
var ethers_1 = require("ethers");
/** ### Subgraph Index Repository */
var SubgraphIndexRepo = /** @class */ (function () {
    /**
     * ### Creates a new Subgraph Index Repository instance
     *
     * @param {Subgraph} _subgraph Subgraph client instance
     *
     * @returns {SubgraphIndexRepo} Subgraph Index Repository instance
     */
    function SubgraphIndexRepo(_subgraph) {
        this._subgraph = _subgraph !== null && _subgraph !== void 0 ? _subgraph : subgraph_1.Subgraph.fromUrl();
    }
    /**
     * ### Get the holders of the index
     *
     * @param {Address} indexAddress The address of the index
     *
     * @returns {Promise<Address[]>} Addresses of the holders
     */
    SubgraphIndexRepo.prototype.holders = function (indexAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this._subgraph.query({
                                query: (0, subgraph_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t\t\tquery IndexHolders($indexAddress: ID!) {\n\t\t\t\t\tindex(id: $indexAddress) {\n\t\t\t\t\t\tusers {\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tquery IndexHolders($indexAddress: ID!) {\n\t\t\t\t\tindex(id: $indexAddress) {\n\t\t\t\t\t\tusers {\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"]))),
                                variables: {
                                    indexAddress: indexAddress,
                                },
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        // TODO: move dead address to global constants
                        return [2 /*return*/, data.index.users
                                .map(function (_a) {
                                var user = _a.user;
                                return user.id;
                            })
                                .filter(function (address) {
                                return address !== '0x000000000000000000000000000000000000dead' &&
                                    address !== ethers_1.constants.AddressZero;
                            })];
                }
            });
        });
    };
    /**
     * ### Get the count of holders of the index
     *
     * @param {Address} indexAddress The address of the index
     *
     * @returns {Promise<number>} The count of holders
     */
    SubgraphIndexRepo.prototype.holdersCount = function (indexAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this._subgraph.query({
                                query: (0, subgraph_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t\t\tquery IndexHolders($indexAddress: ID!) {\n\t\t\t\t\tindex(id: $indexAddress) {\n\t\t\t\t\t\tuniqueHolders\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tquery IndexHolders($indexAddress: ID!) {\n\t\t\t\t\tindex(id: $indexAddress) {\n\t\t\t\t\t\tuniqueHolders\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"]))),
                                variables: {
                                    indexAddress: indexAddress,
                                },
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.index.uniqueHolders];
                }
            });
        });
    };
    /**
     * ### Get fees of the index
     *
     * @param {Address} indexAddress The address of the index
     *
     * @returns {Promise<Fees>} Fees of the index
     */
    SubgraphIndexRepo.prototype.fees = function (indexAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this._subgraph.query({
                                query: (0, subgraph_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t\t\tquery IndexHolders($indexAddress: ID!) {\n\t\t\t\t\tindex(id: $indexAddress) {\n\t\t\t\t\t\tfeeBurn\n\t\t\t\t\t\tfeeMint\n\t\t\t\t\t\tfeeAUMPercent\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tquery IndexHolders($indexAddress: ID!) {\n\t\t\t\t\tindex(id: $indexAddress) {\n\t\t\t\t\t\tfeeBurn\n\t\t\t\t\t\tfeeMint\n\t\t\t\t\t\tfeeAUMPercent\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"]))),
                                variables: {
                                    indexAddress: indexAddress,
                                },
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                minting: data.index.feeMint,
                                management: data.index.feeBurn,
                                redemption: data.index.feeAUMPercent,
                            }];
                }
            });
        });
    };
    SubgraphIndexRepo.prototype.priceEth = function (indexAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this._subgraph.query({
                                query: (0, subgraph_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t\t\t\tquery IndexHolders($indexAddress: ID!) {\n\t\t\t\t\tindex(id: $indexAddress) {\n\t\t\t\t\t\tbasePriceETH\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tquery IndexHolders($indexAddress: ID!) {\n\t\t\t\t\tindex(id: $indexAddress) {\n\t\t\t\t\t\tbasePriceETH\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"]))),
                                variables: {
                                    indexAddress: indexAddress,
                                },
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, ethers_1.BigNumber.from(data.index.basePriceETH)];
                }
            });
        });
    };
    return SubgraphIndexRepo;
}());
exports.SubgraphIndexRepo = SubgraphIndexRepo;
/** ### Subgraph Index Repository Singleton */
exports.subgraphIndexRepo = new SubgraphIndexRepo();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=subraph.repository.js.map