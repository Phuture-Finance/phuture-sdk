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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhutureError = void 0;
var can_set_prototype_1 = require("./can-set-prototype");
/**
 * ### Error thrown on unexpected cases while interacting with Phuture interfaces
 */
var PhutureError = /** @class */ (function (_super) {
    __extends(PhutureError, _super);
    /**
     * ### Creates an instance of PhutureError
     *
     * @param props Error props
     *
     * @returns Instance of PhutureError
     */
    function PhutureError(props) {
        var _newTarget = this.constructor;
        var _this = this;
        var status = props.status, message = props.message, errors = props.errors;
        var error = message
            ? __assign({ message: message }, (status ? { status: status } : {})) : errors[0];
        _this = _super.call(this, error.message) || this;
        _this.name = _this.constructor.name;
        _this.errors = message ? [error] : errors;
        if (error.status)
            _this.status = error.status;
        if (can_set_prototype_1.canSetPrototype)
            Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return PhutureError;
}(Error));
exports.PhutureError = PhutureError;
//# sourceMappingURL=phuture.error.js.map