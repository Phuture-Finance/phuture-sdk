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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erc20Permit = exports.encodePermit = void 0;
var types_1 = require("@phuture/types");
var ethers_1 = require("ethers");
var abi_1 = require("@ethersproject/abi");
var erc_20_1 = require("./erc-20");
var types_2 = require("./types");
/**
 * ### Function to check if permit parameters are type of allowed
 * @param options Permit options
 * @returns True if options are allowed, false otherwise
 */
var isAllowedPermit = function (options) { return 'nonce' in options; };
/** ### Erc20Permit Contract Interface */
var permitInterface = new abi_1.Interface([
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
            },
            {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'selfPermit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nonce',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'expiry',
                type: 'uint256',
            },
            {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'selfPermitAllowed',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nonce',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'expiry',
                type: 'uint256',
            },
            {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'selfPermitAllowedIfNecessary',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
            },
            {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'selfPermitIfNecessary',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
]);
/**
 * ### Encodes permit data for given erc20 contract and options
 * @param erc20 Erc20 contract instance of contract address
 */
var encodePermit = function (erc20) {
    return function (options) {
        var _a = isAllowedPermit(options)
            ? ['selfPermitAllowed', options.nonce, options.expiry]
            : ['selfPermit', options.amount, options.deadline], functionName = _a[0], amount = _a[1], deadline = _a[2];
        return permitInterface.encodeFunctionData(functionName, [
            (0, types_1.isAddress)(erc20) ? erc20 : erc20.address,
            ethers_1.BigNumber.from(amount).toHexString(),
            ethers_1.BigNumber.from(deadline).toHexString(),
            options.v,
            options.r,
            options.s,
        ]);
    };
};
exports.encodePermit = encodePermit;
/** ### Erc20Permit Token Contract */
var Erc20Permit = /** @class */ (function (_super) {
    __extends(Erc20Permit, _super);
    /**
     * ### Creates a new Erc20Permit instance
     *
     * @param account Account to use for interacting with the contract
     * @param contract Contract instance or address of the Erc20Permit token contract
     * @param factory Contract factory to use for creating the contract
     *
     * @returns New Erc20Permit token instance
     */
    function Erc20Permit(account, contract, factory) {
        if (factory === void 0) { factory = types_2.ERC20Permit__factory; }
        var _this = _super.call(this, account, contract, factory) || this;
        /** Encodes permit data for the given options */
        _this.encodePermit = (0, exports.encodePermit)(_this);
        return _this;
    }
    return Erc20Permit;
}(erc_20_1.Erc20));
exports.Erc20Permit = Erc20Permit;
//# sourceMappingURL=erc-20-permit.js.map