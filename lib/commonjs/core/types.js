"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveValue = exports.ToastPosition = void 0;
let ToastPosition;
exports.ToastPosition = ToastPosition;

(function (ToastPosition) {
  ToastPosition[ToastPosition["TOP"] = 1] = "TOP";
  ToastPosition[ToastPosition["BOTTOM"] = 2] = "BOTTOM";
})(ToastPosition || (exports.ToastPosition = ToastPosition = {}));

const isFunction = valOrFunction => typeof valOrFunction === 'function';

const resolveValue = (valOrFunction, arg) => isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;

exports.resolveValue = resolveValue;
//# sourceMappingURL=types.js.map