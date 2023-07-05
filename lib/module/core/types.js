export let ToastPosition;

(function (ToastPosition) {
  ToastPosition[ToastPosition["TOP"] = 1] = "TOP";
  ToastPosition[ToastPosition["BOTTOM"] = 2] = "BOTTOM";
})(ToastPosition || (ToastPosition = {}));

const isFunction = valOrFunction => typeof valOrFunction === 'function';

export const resolveValue = (valOrFunction, arg) => isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;
//# sourceMappingURL=types.js.map