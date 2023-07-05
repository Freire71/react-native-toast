"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toasts = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _headless = require("../headless");

var _Toast = require("./Toast");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Toasts = _ref => {
  let {
    overrideDarkMode,
    extraInsets,
    onToastHide,
    onToastPress,
    onToastShow,
    providerKey = 'DEFAULT'
  } = _ref;
  const {
    toasts,
    handlers
  } = (0, _headless.useToaster)({
    providerKey
  });
  const {
    startPause,
    endPause
  } = handlers;
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      position: 'absolute',
      top: insets.top + ((extraInsets === null || extraInsets === void 0 ? void 0 : extraInsets.top) ?? 0) + 16,
      left: insets.left + ((extraInsets === null || extraInsets === void 0 ? void 0 : extraInsets.left) ?? 0),
      right: insets.right + ((extraInsets === null || extraInsets === void 0 ? void 0 : extraInsets.right) ?? 0),
      bottom: insets.bottom + ((extraInsets === null || extraInsets === void 0 ? void 0 : extraInsets.bottom) ?? 0) + 16
    },
    pointerEvents: 'box-none'
  }, toasts.map(t => /*#__PURE__*/_react.default.createElement(_Toast.Toast, {
    key: t.id,
    toast: t,
    startPause: startPause,
    endPause: endPause,
    updateHeight: handlers.updateHeight,
    offset: handlers.calculateOffset(t, {
      reverseOrder: true
    }),
    overrideDarkMode: overrideDarkMode,
    onToastHide: onToastHide,
    onToastPress: onToastPress,
    onToastShow: onToastShow
  })));
};

exports.Toasts = Toasts;
//# sourceMappingURL=Toasts.js.map