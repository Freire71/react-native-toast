import React from 'react';
import { View } from 'react-native';
import { useToaster } from '../headless';
import { Toast } from './Toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const Toasts = _ref => {
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
  } = useToaster({
    providerKey
  });
  const {
    startPause,
    endPause
  } = handlers;
  const insets = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(View, {
    style: {
      position: 'absolute',
      top: insets.top + ((extraInsets === null || extraInsets === void 0 ? void 0 : extraInsets.top) ?? 0) + 16,
      left: insets.left + ((extraInsets === null || extraInsets === void 0 ? void 0 : extraInsets.left) ?? 0),
      right: insets.right + ((extraInsets === null || extraInsets === void 0 ? void 0 : extraInsets.right) ?? 0),
      bottom: insets.bottom + ((extraInsets === null || extraInsets === void 0 ? void 0 : extraInsets.bottom) ?? 0) + 16
    },
    pointerEvents: 'box-none'
  }, toasts.map(t => /*#__PURE__*/React.createElement(Toast, {
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
//# sourceMappingURL=Toasts.js.map