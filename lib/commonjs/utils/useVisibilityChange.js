"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVisibilityChange = void 0;

var _react = require("react");

const useVisibilityChange = (onShow, onHide, visible) => {
  const [mounted, setMounted] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (!mounted && visible) {
      setMounted(true);
      onShow();
    }

    if (mounted && !visible) {
      setMounted(false);
      onHide();
    }
  }, [visible, mounted, onShow, onHide]);
  return undefined;
};

exports.useVisibilityChange = useVisibilityChange;
//# sourceMappingURL=useVisibilityChange.js.map