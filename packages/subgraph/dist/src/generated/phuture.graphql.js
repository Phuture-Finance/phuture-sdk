"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VToken_OrderBy = exports._SubgraphErrorPolicy_ = exports.YearlyIndexStat_OrderBy = exports.WeeklyIndexStat_OrderBy = exports.User_OrderBy = exports.UserIndex_OrderBy = exports.UserIndexHistory_OrderBy = exports.UserCapitalization_OrderBy = exports.Transfer_OrderBy = exports.TransferType = exports.Transaction_OrderBy = exports.Swap_OrderBy = exports.SushiPair_OrderBy = exports.Stat_OrderBy = exports.Pair_OrderBy = exports.Order_OrderBy = exports.OrderDirection = exports.OrderDetailsInfo_OrderBy = exports.MonthlyIndexStat_OrderBy = exports.LastOrderIndex_OrderBy = exports.Index_OrderBy = exports.IndexFactory_OrderBy = exports.IndexAsset_OrderBy = exports.HourlyIndexStat_OrderBy = exports.DailyUserIndexHistory_OrderBy = exports.DailyStat_OrderBy = exports.DailyIndexStat_OrderBy = exports.DailyCapitalization_OrderBy = exports.DailyAssetStat_OrderBy = exports.Dex_OrderBy = exports.ChainLinkAgg_OrderBy = exports.Asset_OrderBy = void 0;
var Asset_OrderBy;
(function (Asset_OrderBy) {
    Asset_OrderBy["_indexes"] = "_indexes";
    Asset_OrderBy["_vTokens"] = "_vTokens";
    Asset_OrderBy["basePrice"] = "basePrice";
    Asset_OrderBy["basePriceSushi"] = "basePriceSushi";
    Asset_OrderBy["basePriceUni"] = "basePriceUni";
    Asset_OrderBy["dailyStats"] = "dailyStats";
    Asset_OrderBy["decimals"] = "decimals";
    Asset_OrderBy["id"] = "id";
    Asset_OrderBy["indexCount"] = "indexCount";
    Asset_OrderBy["indexes"] = "indexes";
    Asset_OrderBy["isWhitelisted"] = "isWhitelisted";
    Asset_OrderBy["marketCap"] = "marketCap";
    Asset_OrderBy["name"] = "name";
    Asset_OrderBy["pairsAsAsset0"] = "pairsAsAsset0";
    Asset_OrderBy["pairsAsAsset1"] = "pairsAsAsset1";
    Asset_OrderBy["symbol"] = "symbol";
    Asset_OrderBy["totalSupply"] = "totalSupply";
    Asset_OrderBy["vTokens"] = "vTokens";
    Asset_OrderBy["vaultBaseReserve"] = "vaultBaseReserve";
    Asset_OrderBy["vaultReserve"] = "vaultReserve";
})(Asset_OrderBy = exports.Asset_OrderBy || (exports.Asset_OrderBy = {}));
var ChainLinkAgg_OrderBy;
(function (ChainLinkAgg_OrderBy) {
    ChainLinkAgg_OrderBy["answer"] = "answer";
    ChainLinkAgg_OrderBy["asset"] = "asset";
    ChainLinkAgg_OrderBy["decimals"] = "decimals";
    ChainLinkAgg_OrderBy["description"] = "description";
    ChainLinkAgg_OrderBy["id"] = "id";
    ChainLinkAgg_OrderBy["nextAgg"] = "nextAgg";
    ChainLinkAgg_OrderBy["updatedAt"] = "updatedAt";
})(ChainLinkAgg_OrderBy = exports.ChainLinkAgg_OrderBy || (exports.ChainLinkAgg_OrderBy = {}));
var Dex_OrderBy;
(function (Dex_OrderBy) {
    Dex_OrderBy["id"] = "id";
    Dex_OrderBy["router"] = "router";
    Dex_OrderBy["type"] = "type";
})(Dex_OrderBy = exports.Dex_OrderBy || (exports.Dex_OrderBy = {}));
var DailyAssetStat_OrderBy;
(function (DailyAssetStat_OrderBy) {
    DailyAssetStat_OrderBy["asset"] = "asset";
    DailyAssetStat_OrderBy["basePrice"] = "basePrice";
    DailyAssetStat_OrderBy["date"] = "date";
    DailyAssetStat_OrderBy["id"] = "id";
    DailyAssetStat_OrderBy["vaultBaseReserve"] = "vaultBaseReserve";
    DailyAssetStat_OrderBy["vaultReserve"] = "vaultReserve";
})(DailyAssetStat_OrderBy = exports.DailyAssetStat_OrderBy || (exports.DailyAssetStat_OrderBy = {}));
var DailyCapitalization_OrderBy;
(function (DailyCapitalization_OrderBy) {
    DailyCapitalization_OrderBy["basePrice"] = "basePrice";
    DailyCapitalization_OrderBy["capitalization"] = "capitalization";
    DailyCapitalization_OrderBy["id"] = "id";
    DailyCapitalization_OrderBy["index"] = "index";
    DailyCapitalization_OrderBy["logIndex"] = "logIndex";
    DailyCapitalization_OrderBy["timestamp"] = "timestamp";
    DailyCapitalization_OrderBy["totalSupply"] = "totalSupply";
})(DailyCapitalization_OrderBy = exports.DailyCapitalization_OrderBy || (exports.DailyCapitalization_OrderBy = {}));
var DailyIndexStat_OrderBy;
(function (DailyIndexStat_OrderBy) {
    DailyIndexStat_OrderBy["basePrice"] = "basePrice";
    DailyIndexStat_OrderBy["basePriceETH"] = "basePriceETH";
    DailyIndexStat_OrderBy["baseVolume"] = "baseVolume";
    DailyIndexStat_OrderBy["date"] = "date";
    DailyIndexStat_OrderBy["id"] = "id";
    DailyIndexStat_OrderBy["index"] = "index";
    DailyIndexStat_OrderBy["marketCap"] = "marketCap";
    DailyIndexStat_OrderBy["uniqueHolders"] = "uniqueHolders";
})(DailyIndexStat_OrderBy = exports.DailyIndexStat_OrderBy || (exports.DailyIndexStat_OrderBy = {}));
var DailyStat_OrderBy;
(function (DailyStat_OrderBy) {
    DailyStat_OrderBy["date"] = "date";
    DailyStat_OrderBy["id"] = "id";
    DailyStat_OrderBy["indexCount"] = "indexCount";
    DailyStat_OrderBy["totalValueLocked"] = "totalValueLocked";
})(DailyStat_OrderBy = exports.DailyStat_OrderBy || (exports.DailyStat_OrderBy = {}));
var DailyUserIndexHistory_OrderBy;
(function (DailyUserIndexHistory_OrderBy) {
    DailyUserIndexHistory_OrderBy["avgBalance"] = "avgBalance";
    DailyUserIndexHistory_OrderBy["avgCapitalization"] = "avgCapitalization";
    DailyUserIndexHistory_OrderBy["id"] = "id";
    DailyUserIndexHistory_OrderBy["index"] = "index";
    DailyUserIndexHistory_OrderBy["logIndex"] = "logIndex";
    DailyUserIndexHistory_OrderBy["number"] = "number";
    DailyUserIndexHistory_OrderBy["timestamp"] = "timestamp";
    DailyUserIndexHistory_OrderBy["total"] = "total";
    DailyUserIndexHistory_OrderBy["totalCap"] = "totalCap";
    DailyUserIndexHistory_OrderBy["totalSupply"] = "totalSupply";
    DailyUserIndexHistory_OrderBy["user"] = "user";
})(DailyUserIndexHistory_OrderBy = exports.DailyUserIndexHistory_OrderBy || (exports.DailyUserIndexHistory_OrderBy = {}));
var HourlyIndexStat_OrderBy;
(function (HourlyIndexStat_OrderBy) {
    HourlyIndexStat_OrderBy["basePrice"] = "basePrice";
    HourlyIndexStat_OrderBy["baseVolume"] = "baseVolume";
    HourlyIndexStat_OrderBy["date"] = "date";
    HourlyIndexStat_OrderBy["id"] = "id";
    HourlyIndexStat_OrderBy["index"] = "index";
    HourlyIndexStat_OrderBy["marketCap"] = "marketCap";
    HourlyIndexStat_OrderBy["uniqueHolders"] = "uniqueHolders";
})(HourlyIndexStat_OrderBy = exports.HourlyIndexStat_OrderBy || (exports.HourlyIndexStat_OrderBy = {}));
var IndexAsset_OrderBy;
(function (IndexAsset_OrderBy) {
    IndexAsset_OrderBy["asset"] = "asset";
    IndexAsset_OrderBy["id"] = "id";
    IndexAsset_OrderBy["inactiveIndex"] = "inactiveIndex";
    IndexAsset_OrderBy["index"] = "index";
    IndexAsset_OrderBy["shares"] = "shares";
    IndexAsset_OrderBy["weight"] = "weight";
})(IndexAsset_OrderBy = exports.IndexAsset_OrderBy || (exports.IndexAsset_OrderBy = {}));
var IndexFactory_OrderBy;
(function (IndexFactory_OrderBy) {
    IndexFactory_OrderBy["id"] = "id";
    IndexFactory_OrderBy["indices"] = "indices";
    IndexFactory_OrderBy["type"] = "type";
    IndexFactory_OrderBy["vTokenFactory"] = "vTokenFactory";
})(IndexFactory_OrderBy = exports.IndexFactory_OrderBy || (exports.IndexFactory_OrderBy = {}));
var Index_OrderBy;
(function (Index_OrderBy) {
    Index_OrderBy["_assets"] = "_assets";
    Index_OrderBy["_inactiveAssets"] = "_inactiveAssets";
    Index_OrderBy["assets"] = "assets";
    Index_OrderBy["basePrice"] = "basePrice";
    Index_OrderBy["basePriceETH"] = "basePriceETH";
    Index_OrderBy["baseVolume"] = "baseVolume";
    Index_OrderBy["created"] = "created";
    Index_OrderBy["dailyStats"] = "dailyStats";
    Index_OrderBy["decimals"] = "decimals";
    Index_OrderBy["feeAUMPercent"] = "feeAUMPercent";
    Index_OrderBy["feeBurn"] = "feeBurn";
    Index_OrderBy["feeMint"] = "feeMint";
    Index_OrderBy["hourlyStats"] = "hourlyStats";
    Index_OrderBy["id"] = "id";
    Index_OrderBy["inactiveAssets"] = "inactiveAssets";
    Index_OrderBy["indexFactory"] = "indexFactory";
    Index_OrderBy["marketCap"] = "marketCap";
    Index_OrderBy["monthlyStats"] = "monthlyStats";
    Index_OrderBy["name"] = "name";
    Index_OrderBy["sector"] = "sector";
    Index_OrderBy["symbol"] = "symbol";
    Index_OrderBy["totalSupply"] = "totalSupply";
    Index_OrderBy["transaction"] = "transaction";
    Index_OrderBy["type"] = "type";
    Index_OrderBy["uniqueHolders"] = "uniqueHolders";
    Index_OrderBy["users"] = "users";
    Index_OrderBy["weeklyStats"] = "weeklyStats";
    Index_OrderBy["yearlyStats"] = "yearlyStats";
})(Index_OrderBy = exports.Index_OrderBy || (exports.Index_OrderBy = {}));
var LastOrderIndex_OrderBy;
(function (LastOrderIndex_OrderBy) {
    LastOrderIndex_OrderBy["id"] = "id";
    LastOrderIndex_OrderBy["index"] = "index";
    LastOrderIndex_OrderBy["order"] = "order";
})(LastOrderIndex_OrderBy = exports.LastOrderIndex_OrderBy || (exports.LastOrderIndex_OrderBy = {}));
var MonthlyIndexStat_OrderBy;
(function (MonthlyIndexStat_OrderBy) {
    MonthlyIndexStat_OrderBy["basePrice"] = "basePrice";
    MonthlyIndexStat_OrderBy["basePriceETH"] = "basePriceETH";
    MonthlyIndexStat_OrderBy["baseVolume"] = "baseVolume";
    MonthlyIndexStat_OrderBy["date"] = "date";
    MonthlyIndexStat_OrderBy["id"] = "id";
    MonthlyIndexStat_OrderBy["index"] = "index";
    MonthlyIndexStat_OrderBy["marketCap"] = "marketCap";
    MonthlyIndexStat_OrderBy["uniqueHolders"] = "uniqueHolders";
})(MonthlyIndexStat_OrderBy = exports.MonthlyIndexStat_OrderBy || (exports.MonthlyIndexStat_OrderBy = {}));
var OrderDetailsInfo_OrderBy;
(function (OrderDetailsInfo_OrderBy) {
    OrderDetailsInfo_OrderBy["asset"] = "asset";
    OrderDetailsInfo_OrderBy["id"] = "id";
    OrderDetailsInfo_OrderBy["order"] = "order";
    OrderDetailsInfo_OrderBy["shares"] = "shares";
    OrderDetailsInfo_OrderBy["side"] = "side";
})(OrderDetailsInfo_OrderBy = exports.OrderDetailsInfo_OrderBy || (exports.OrderDetailsInfo_OrderBy = {}));
/** Defines the order direction, either ascending or descending */
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["asc"] = "asc";
    OrderDirection["desc"] = "desc";
})(OrderDirection = exports.OrderDirection || (exports.OrderDirection = {}));
var Order_OrderBy;
(function (Order_OrderBy) {
    Order_OrderBy["id"] = "id";
    Order_OrderBy["index"] = "index";
    Order_OrderBy["orderDetails"] = "orderDetails";
    Order_OrderBy["order_id"] = "order_id";
})(Order_OrderBy = exports.Order_OrderBy || (exports.Order_OrderBy = {}));
var Pair_OrderBy;
(function (Pair_OrderBy) {
    Pair_OrderBy["asset0"] = "asset0";
    Pair_OrderBy["asset0Reserve"] = "asset0Reserve";
    Pair_OrderBy["asset1"] = "asset1";
    Pair_OrderBy["asset1Reserve"] = "asset1Reserve";
    Pair_OrderBy["id"] = "id";
    Pair_OrderBy["swap"] = "swap";
    Pair_OrderBy["totalSupply"] = "totalSupply";
})(Pair_OrderBy = exports.Pair_OrderBy || (exports.Pair_OrderBy = {}));
var Stat_OrderBy;
(function (Stat_OrderBy) {
    Stat_OrderBy["id"] = "id";
    Stat_OrderBy["indexCount"] = "indexCount";
    Stat_OrderBy["totalValueLocked"] = "totalValueLocked";
})(Stat_OrderBy = exports.Stat_OrderBy || (exports.Stat_OrderBy = {}));
var SushiPair_OrderBy;
(function (SushiPair_OrderBy) {
    SushiPair_OrderBy["asset0"] = "asset0";
    SushiPair_OrderBy["asset0Reserve"] = "asset0Reserve";
    SushiPair_OrderBy["asset1"] = "asset1";
    SushiPair_OrderBy["asset1Reserve"] = "asset1Reserve";
    SushiPair_OrderBy["id"] = "id";
    SushiPair_OrderBy["swap"] = "swap";
    SushiPair_OrderBy["totalSupply"] = "totalSupply";
})(SushiPair_OrderBy = exports.SushiPair_OrderBy || (exports.SushiPair_OrderBy = {}));
var Swap_OrderBy;
(function (Swap_OrderBy) {
    Swap_OrderBy["id"] = "id";
    Swap_OrderBy["pairs"] = "pairs";
})(Swap_OrderBy = exports.Swap_OrderBy || (exports.Swap_OrderBy = {}));
var Transaction_OrderBy;
(function (Transaction_OrderBy) {
    Transaction_OrderBy["blockNumber"] = "blockNumber";
    Transaction_OrderBy["gasPrice"] = "gasPrice";
    Transaction_OrderBy["gasUsed"] = "gasUsed";
    Transaction_OrderBy["id"] = "id";
    Transaction_OrderBy["timestamp"] = "timestamp";
    Transaction_OrderBy["transfers"] = "transfers";
    Transaction_OrderBy["value"] = "value";
})(Transaction_OrderBy = exports.Transaction_OrderBy || (exports.Transaction_OrderBy = {}));
var TransferType;
(function (TransferType) {
    TransferType["Burn"] = "Burn";
    TransferType["Mint"] = "Mint";
    TransferType["Send"] = "Send";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
var Transfer_OrderBy;
(function (Transfer_OrderBy) {
    Transfer_OrderBy["from"] = "from";
    Transfer_OrderBy["id"] = "id";
    Transfer_OrderBy["index"] = "index";
    Transfer_OrderBy["to"] = "to";
    Transfer_OrderBy["transaction"] = "transaction";
    Transfer_OrderBy["type"] = "type";
    Transfer_OrderBy["value"] = "value";
})(Transfer_OrderBy = exports.Transfer_OrderBy || (exports.Transfer_OrderBy = {}));
var UserCapitalization_OrderBy;
(function (UserCapitalization_OrderBy) {
    UserCapitalization_OrderBy["capitalization"] = "capitalization";
    UserCapitalization_OrderBy["id"] = "id";
    UserCapitalization_OrderBy["index"] = "index";
    UserCapitalization_OrderBy["logIndex"] = "logIndex";
    UserCapitalization_OrderBy["timestamp"] = "timestamp";
})(UserCapitalization_OrderBy = exports.UserCapitalization_OrderBy || (exports.UserCapitalization_OrderBy = {}));
var UserIndexHistory_OrderBy;
(function (UserIndexHistory_OrderBy) {
    UserIndexHistory_OrderBy["balance"] = "balance";
    UserIndexHistory_OrderBy["capitalization"] = "capitalization";
    UserIndexHistory_OrderBy["id"] = "id";
    UserIndexHistory_OrderBy["index"] = "index";
    UserIndexHistory_OrderBy["logIndex"] = "logIndex";
    UserIndexHistory_OrderBy["timestamp"] = "timestamp";
    UserIndexHistory_OrderBy["totalSupply"] = "totalSupply";
    UserIndexHistory_OrderBy["user"] = "user";
})(UserIndexHistory_OrderBy = exports.UserIndexHistory_OrderBy || (exports.UserIndexHistory_OrderBy = {}));
var UserIndex_OrderBy;
(function (UserIndex_OrderBy) {
    UserIndex_OrderBy["balance"] = "balance";
    UserIndex_OrderBy["capitalization"] = "capitalization";
    UserIndex_OrderBy["id"] = "id";
    UserIndex_OrderBy["index"] = "index";
    UserIndex_OrderBy["user"] = "user";
})(UserIndex_OrderBy = exports.UserIndex_OrderBy || (exports.UserIndex_OrderBy = {}));
var User_OrderBy;
(function (User_OrderBy) {
    User_OrderBy["id"] = "id";
    User_OrderBy["indexes"] = "indexes";
})(User_OrderBy = exports.User_OrderBy || (exports.User_OrderBy = {}));
var WeeklyIndexStat_OrderBy;
(function (WeeklyIndexStat_OrderBy) {
    WeeklyIndexStat_OrderBy["basePrice"] = "basePrice";
    WeeklyIndexStat_OrderBy["basePriceETH"] = "basePriceETH";
    WeeklyIndexStat_OrderBy["baseVolume"] = "baseVolume";
    WeeklyIndexStat_OrderBy["date"] = "date";
    WeeklyIndexStat_OrderBy["id"] = "id";
    WeeklyIndexStat_OrderBy["index"] = "index";
    WeeklyIndexStat_OrderBy["marketCap"] = "marketCap";
    WeeklyIndexStat_OrderBy["uniqueHolders"] = "uniqueHolders";
})(WeeklyIndexStat_OrderBy = exports.WeeklyIndexStat_OrderBy || (exports.WeeklyIndexStat_OrderBy = {}));
var YearlyIndexStat_OrderBy;
(function (YearlyIndexStat_OrderBy) {
    YearlyIndexStat_OrderBy["basePrice"] = "basePrice";
    YearlyIndexStat_OrderBy["basePriceETH"] = "basePriceETH";
    YearlyIndexStat_OrderBy["baseVolume"] = "baseVolume";
    YearlyIndexStat_OrderBy["date"] = "date";
    YearlyIndexStat_OrderBy["id"] = "id";
    YearlyIndexStat_OrderBy["index"] = "index";
    YearlyIndexStat_OrderBy["marketCap"] = "marketCap";
    YearlyIndexStat_OrderBy["uniqueHolders"] = "uniqueHolders";
})(YearlyIndexStat_OrderBy = exports.YearlyIndexStat_OrderBy || (exports.YearlyIndexStat_OrderBy = {}));
var _SubgraphErrorPolicy_;
(function (_SubgraphErrorPolicy_) {
    /** Data will be returned even if the subgraph has indexing errors */
    _SubgraphErrorPolicy_["allow"] = "allow";
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    _SubgraphErrorPolicy_["deny"] = "deny";
})(_SubgraphErrorPolicy_ = exports._SubgraphErrorPolicy_ || (exports._SubgraphErrorPolicy_ = {}));
var VToken_OrderBy;
(function (VToken_OrderBy) {
    VToken_OrderBy["asset"] = "asset";
    VToken_OrderBy["assetReserve"] = "assetReserve";
    VToken_OrderBy["capitalization"] = "capitalization";
    VToken_OrderBy["deposited"] = "deposited";
    VToken_OrderBy["factory"] = "factory";
    VToken_OrderBy["id"] = "id";
    VToken_OrderBy["platformTotalSupply"] = "platformTotalSupply";
    VToken_OrderBy["platformTotalSupplyDec"] = "platformTotalSupplyDec";
    VToken_OrderBy["tokenType"] = "tokenType";
    VToken_OrderBy["totalAmount"] = "totalAmount";
})(VToken_OrderBy = exports.VToken_OrderBy || (exports.VToken_OrderBy = {}));
//# sourceMappingURL=phuture.graphql.js.map