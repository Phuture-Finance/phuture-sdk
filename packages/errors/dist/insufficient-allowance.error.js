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
exports.InsufficientAllowanceError = void 0;
var ethers_1 = require("ethers");
var can_set_prototype_1 = require("./can-set-prototype");
/**
 * ### Error thrown on insufficient allowance
 */
var InsufficientAllowanceError = /** @class */ (function (_super) {
    __extends(InsufficientAllowanceError, _super);
    /**
     * ### Creates an instance of InsufficientAllowanceError
     *
     * @param expectedAllowance Expected allowance
     * @param actualAllowance Actual allowance
     *
     * @returns Instance of InsufficientAllowanceError
     */
    function InsufficientAllowanceError(expectedAllowance, actualAllowance) {
        if (actualAllowance === void 0) { actualAllowance = 0; }
        var _newTarget = this.constructor;
        var _this = this;
        expectedAllowance = ethers_1.BigNumber.from(expectedAllowance);
        actualAllowance = ethers_1.BigNumber.from(actualAllowance);
        var message = "Insufficient allowance: expected ".concat(expectedAllowance.toString(), ", but got ").concat(actualAllowance.toString());
        _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.expectedAllowance = expectedAllowance;
        _this.actualAllowance = actualAllowance;
        if (can_set_prototype_1.canSetPrototype)
            Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return InsufficientAllowanceError;
}(Error));
exports.InsufficientAllowanceError = InsufficientAllowanceError;
//# sourceMappingURL=insufficient-allowance.error.js.map