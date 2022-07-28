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
var chai_1 = require("chai");
var src_1 = require("../src");
var core_1 = require("@apollo/client/core");
var userId = "0x000000000000000000000000000000000000dead";
describe("get graphql client", function () {
    var phutureGraphQlEndpoint = "https://graph.dev.phuture.finance/subgraphs/name/phuture/mvp";
    var client = src_1.Subgraph.fromUrl(phutureGraphQlEndpoint);
    it("should get user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query({
                        query: (0, core_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t\t\tquery User($userId: ID!) {\n\t\t\t\t\tuser(id: $userId) {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tquery User($userId: ID!) {\n\t\t\t\t\tuser(id: $userId) {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"]))),
                        variables: { userId: userId },
                    })];
                case 1:
                    data = (_a.sent()).data;
                    (0, chai_1.expect)(data.user.id).to.equal(userId);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1;
// test("fetch user indices", async () => {
// 	// Setup
// 	// execute
// 	const { users } = await phutureGraphQl().getUserIndices({ id: userId });
// 	const indices = users[0].indexes;
//
// 	// Verify
// 	expect(indices).not.to.be.undefined;
// });
//
// test("successfully fetch index History", async () => {
// 	// Setup
// 	// execute
// 	const { userIndexHistories } = await phutureGraphQl().getUserIndexHistories({
// 		id: userId,
// 		dateLimit: "0",
// 	});
// 	const user = userIndexHistories[0].user;
//
// 	// Verify
// 	expect(user.id).to.equal(userId);
// });
//
// test("unsuccessfully fetch index History", async () => {
// 	// Setup
// 	// execute
// 	const { userIndexHistories } = await phutureGraphQl().getUserIndexHistories({
// 		id: userId,
// 		dateLimit: "90000000000",
// 	});
// 	// Verify
// 	expect(userIndexHistories.length).to.equal(0);
// });
//
// test("successfully fetch daily capitalisations", async () => {
// 	// Setup
// 	// execute
// 	const { dailyCapitalizations } = await phutureGraphQl().getCapitalizations({
// 		timestamp: "0",
// 	});
// 	// Verify
// 	expect(dailyCapitalizations.length).not.to.equal(0);
// });
//
// test("unsuccessfully fetch daily capitalisations", async () => {
// 	// Setup
// 	// execute
// 	const { dailyCapitalizations } = await phutureGraphQl().getCapitalizations({
// 		timestamp: "9000000000000000000000000000000",
// 	});
// 	// Verify
// 	expect(dailyCapitalizations.length).to.equal(0);
// });
//
// test("fetch portfolio data", async () => {
// 	// Setup
// 	// Execute
// 	const { users } = await phutureGraphQl().getPortfolioData({ id: userId });
// 	// Verify
// 	expect(users[0].indexes.length).not.to.equal(0);
// });
//
// test("chart data", async () => {
// 	// Setup
// 	const variables = {
// 		id: "0xf9ccb834adbe4591fd517aa69a24bf97d1386092",
// 		dateEnd: 1653004800,
// 		dateNow: 1652745600,
// 	};
//
// 	// Execute
// 	const { index } = await phutureGraphQl().getChartData(variables);
//
// 	// Verify
// 	expect(index).not.to.be.undefined;
// });
//
// test("fetch daily cap", async () => {
// 	// Setup
// 	// execute
// 	const { dailyCapitalizations } = await phutureGraphQl().getDailyCap({
// 		date: 0,
// 	});
//
// 	// Verify
// 	expect(dailyCapitalizations.length).not.to.equal(0);
// });
//
// test("fetch index info", async () => {
// 	// Setup
// 	const id = "0x778b8cc9d9d8e97ab7f6e100e45c1e576bb1d6d4";
//
// 	// Execute
// 	const { index } = await phutureGraphQl().getIndexInfo({ id });
//
// 	// Verify
// 	expect(index?.id).to.equal(id);
// });
//
// test("get reserves", async () => {
// 	// Setup
// 	// execute
// 	const { reserves } = await lmGraphQl().getReserves();
//
// 	// Verify
// 	expect(reserves).not.to.be.empty;
// });
//
// test("get ranges by address", async () => {
// 	// Setup
// 	const address = "0x0815c1e34a819f48d480a173db83b58c076d7299";
// 	// execute
// 	const { vestingRanges } = await lmGraphQl().getRangesByAddress({ address });
//
// 	// Verify
// 	expect(vestingRanges).not.to.be.empty;
// 	expect(vestingRanges[0]?.account).to.equal(address);
// });
//
// test("get stats", async () => {
// 	// Setup
// 	const id = "0xc11f8e173ee67ffa7bbdd185d2399994aad23ec6";
// 	// execute
// 	const { stat } = await phutureGraphQl().getStats({ id });
//
// 	// Verify
// 	expect(stat).not.to.be.undefined;
// 	expect(stat?.id).to.equal(id);
// });
//
// test("get index", async () => {
// 	// Setup
// 	const id = "0x778b8cc9d9d8e97ab7f6e100e45c1e576bb1d6d4";
// 	// execute
// 	const { indexes } = await phutureGraphQl().getIndex({ id });
//
// 	// Verify
// 	expect(indexes).not.to.be.empty;
// });
//
// test("get user indices details", async () => {
// 	// Setup
// 	const id = "0x000000000000000000000000000000000000dead";
// 	// execute
// 	const { users } = await phutureGraphQl().getUserIndicesDetailed({ id });
//
// 	// Verify
// 	expect(users).not.to.be.empty;
// });
//
// test("get index detailed", async () => {
// 	// Setup
// 	const id = "0x778b8cc9d9d8e97ab7f6e100e45c1e576bb1d6d4";
// 	// execute
// 	const { indexes } = await phutureGraphQl().getIndexDetailed({ id });
//
// 	// Verify
// 	expect(indexes).not.to.be.empty;
// });
//
// test("get all indices", async () => {
// 	// execute
// 	const { indexes } = await phutureGraphQl().getAllIndices();
//
// 	// Verify
// 	expect(indexes).not.to.be.empty;
// });
//
// test("get indices page", async () => {
// 	// Setup
// 	const first = 1000;
// 	const skip = 0;
//
// 	// execute
// 	const { indexes } = await phutureGraphQl().getIndicesPage({ first, skip });
//
// 	// Verify
// 	expect(indexes).not.to.be.empty;
// });
//# sourceMappingURL=graphql.test.js.map