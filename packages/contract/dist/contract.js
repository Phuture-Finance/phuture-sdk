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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
var events_1 = __importDefault(require("events"));
var types_1 = require("@phuture/types");
/** ### Contract Instance */
var Contract = /** @class */ (function (_super) {
    __extends(Contract, _super);
    /**
     * ### Constructs an instance of the contract class
     *
     * @param _account Account used for interacting with the contract
     * @param contract Contract or contract address to interact with
     * @param contractFactory Factory for creating the contract
     *
     * @returns {Contract} The contract instance
     */
    function Contract(_account, contract, contractFactory) {
        var _this = _super.call(this) || this;
        _this._account = _account;
        _this.contractFactory = contractFactory;
        _this.contract = (0, types_1.isAddress)(contract)
            ? contractFactory.connect(contract, _account.signer)
            : contract;
        _account.on('change', function (account) {
            _this.account = account;
        });
        return _this;
    }
    Object.defineProperty(Contract.prototype, "address", {
        /**
         * ### Get the address of the contract
         *
         * @returns Address of the contract
         */
        get: function () {
            return this.contract.address;
        },
        /**
         * ### Set the address of the contract
         *
         * @param address Address of the contract
         */
        set: function (address) {
            this.contract = this.contractFactory.connect(address, this._account.signer);
            this.emit('change', this.contract);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Contract.prototype, "account", {
        /**
         * ### Get the signer used for interacting with the contract
         *
         * @returns Signer used for interacting with the contract
         */
        get: function () {
            return this._account;
        },
        /**
         * ### Set the signer used for interacting with the contract
         *
         * @param account Account used for interacting with the contract
         */
        set: function (account) {
            this._account = account;
            this.contract = this.contractFactory.connect(this.address, account.signer);
            this.emit('change', this.contract);
        },
        enumerable: false,
        configurable: true
    });
    return Contract;
}(events_1.default));
exports.Contract = Contract;
//# sourceMappingURL=contract.js.map