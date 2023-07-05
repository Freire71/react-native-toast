"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _types = require("../core/types");

var _utils = require("../utils");

var _headless = require("../headless");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const AnimatedPressable = _reactNativeReanimated.default.createAnimatedComponent(_reactNative.Pressable);

const DEFAULT_TOAST_HEIGHT = 50;

const Toast = _ref => {
  var _toast$styles, _toast$styles2, _toast$styles3, _toast$styles4;

  let {
    toast,
    updateHeight,
    offset,
    startPause,
    endPause,
    overrideDarkMode,
    onToastHide,
    onToastPress,
    onToastShow
  } = _ref;
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const {
    keyboardShown: keyboardVisible,
    keyboardHeight
  } = (0, _utils.useKeyboard)();
  (0, _utils.useVisibilityChange)(() => {
    onToastShow === null || onToastShow === void 0 ? void 0 : onToastShow(toast);
  }, () => {
    onToastHide === null || onToastHide === void 0 ? void 0 : onToastHide(toast);
  }, toast.visible);
  const isSystemDarkMode = (0, _reactNative.useColorScheme)() === 'dark';
  const isDarkMode = overrideDarkMode !== undefined ? overrideDarkMode : isSystemDarkMode;
  const [toastHeight, setToastHeight] = (0, _react.useState)(toast !== null && toast !== void 0 && toast.height ? toast.height : DEFAULT_TOAST_HEIGHT);
  const [toastWidth, setToastWidth] = (0, _react.useState)(toast !== null && toast !== void 0 && toast.width ? toast.width : width - 32 > 360 ? 360 : width - 32);
  const startingY = (0, _react.useMemo)(() => toast.position === _types.ToastPosition.TOP ? -50 : height - insets.bottom - _reactNative.Platform.select({
    ios: 0,
    default: 32
  }), [height, toast.position, insets.bottom]);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const position = (0, _reactNativeReanimated.useSharedValue)(startingY);
  const offsetY = (0, _reactNativeReanimated.useSharedValue)(startingY);

  const onPress = () => onToastPress === null || onToastPress === void 0 ? void 0 : onToastPress(toast);

  const setPosition = (0, _react.useCallback)(() => {
    //control the position of the toast when rendering
    //based on offset, visibility, keyboard, and toast height
    if (toast.position === _types.ToastPosition.TOP) {
      offsetY.value = (0, _reactNativeReanimated.withTiming)(toast.visible ? offset : startingY);
      position.value = (0, _reactNativeReanimated.withTiming)(toast.visible ? offset : startingY);
    } else {
      let kbHeight = keyboardVisible ? keyboardHeight : 0;
      const val = toast.visible ? startingY - toastHeight - offset - kbHeight - insets.bottom - 24 : startingY;
      offsetY.value = (0, _reactNativeReanimated.withSpring)(val, {
        stiffness: 80
      });
      position.value = (0, _reactNativeReanimated.withSpring)(val, {
        stiffness: 80
      });
    }
  }, [offset, toast.visible, keyboardVisible, keyboardHeight, toastHeight, insets.bottom, position, startingY, toast.position, offsetY]);
  const composedGesture = (0, _react.useMemo)(() => {
    const panGesture = _reactNativeGestureHandler.Gesture.Pan().onUpdate(e => {
      offsetY.value = e.translationY / 4 + position.value;
    }).onEnd(() => {
      (0, _reactNativeReanimated.runOnJS)(setPosition)();
    });

    const flingGesture = _reactNativeGestureHandler.Gesture.Fling().direction(toast.position === _types.ToastPosition.TOP ? _reactNativeGestureHandler.Directions.UP : _reactNativeGestureHandler.Directions.DOWN).onEnd(() => {
      offsetY.value = (0, _reactNativeReanimated.withTiming)(startingY, {
        duration: 40
      });
      (0, _reactNativeReanimated.runOnJS)(_headless.toast.dismiss)(toast.id);
    });

    return _reactNativeGestureHandler.Gesture.Simultaneous(flingGesture, panGesture);
  }, [offsetY, startingY, position, setPosition, toast.position, toast.id]);
  (0, _react.useEffect)(() => {
    //set the toast height if it updates while rendered
    setToastHeight(toast !== null && toast !== void 0 && toast.height ? toast.height : DEFAULT_TOAST_HEIGHT);
  }, [toast.height]);
  (0, _react.useEffect)(() => {
    //set the toast width if it updates while rendered
    setToastWidth(toast !== null && toast !== void 0 && toast.width ? toast.width : width - 32);
  }, [toast.width, width]);
  (0, _react.useEffect)(() => {
    //Control visibility of toast when rendering
    opacity.value = (0, _reactNativeReanimated.withTiming)(toast.visible ? 1 : 0, {
      duration: 300
    });
  }, [toast.visible, opacity]);
  (0, _react.useEffect)(() => {
    setPosition();
  }, [offset, toast.visible, keyboardVisible, keyboardHeight, toastHeight, setPosition]);
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    //Control opacity and translation of toast
    return {
      opacity: opacity.value,
      transform: [{
        translateY: offsetY.value
      }]
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    key: toast.id,
    gesture: composedGesture
  }, /*#__PURE__*/_react.default.createElement(AnimatedPressable, {
    onPressIn: startPause,
    onPressOut: () => {
      endPause();
    },
    onPress: onPress,
    style: [{
      backgroundColor: !toast.customToast ? isDarkMode ? _utils.colors.backgroundDark : _utils.colors.backgroundLight : undefined,
      borderRadius: 8,
      position: 'absolute',
      maxHeight: toastHeight,
      left: (width - toastWidth) / 2,
      zIndex: toast.visible ? 9999 : undefined,
      alignItems: 'center',
      justifyContent: 'center'
    }, style, !toast.disableShadow && (0, _utils.ConstructShadow)('#181821', 0.15, false), (_toast$styles = toast.styles) === null || _toast$styles === void 0 ? void 0 : _toast$styles.pressable]
  }, toast.customToast ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onLayout: event => updateHeight(toast.id, event.nativeEvent.layout.height),
    key: toast.id
  }, toast.customToast({ ...toast,
    height: toastHeight,
    width: toastWidth
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onLayout: event => updateHeight(toast.id, event.nativeEvent.layout.height),
    style: [{
      height: toastHeight,
      width: toastWidth,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16
    }, (_toast$styles2 = toast.styles) === null || _toast$styles2 === void 0 ? void 0 : _toast$styles2.view],
    key: toast.id
  }, (toast.type === 'error' || toast.type === 'success') && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      backgroundColor: toast.type === 'error' ? _utils.colors.error : toast.type === 'success' ? _utils.colors.success : isDarkMode ? _utils.colors.backgroundDark : _utils.colors.backgroundLight,
      width: 3,
      height: '100%',
      borderRadius: 12,
      marginRight: 12
    }, toast === null || toast === void 0 ? void 0 : (_toast$styles3 = toast.styles) === null || _toast$styles3 === void 0 ? void 0 : _toast$styles3.indicator]
  }), typeof toast.icon === 'string' ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, toast.icon) : toast.icon, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 1,
    style: [{
      color: isDarkMode ? _utils.colors.textLight : _utils.colors.textDark,
      padding: 4,
      flex: 1
    }, toast === null || toast === void 0 ? void 0 : (_toast$styles4 = toast.styles) === null || _toast$styles4 === void 0 ? void 0 : _toast$styles4.text]
  }, (0, _types.resolveValue)(toast.message, toast)))));
};

exports.Toast = Toast;
//# sourceMappingURL=Toast.js.map