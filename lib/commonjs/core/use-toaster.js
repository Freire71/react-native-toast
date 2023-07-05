"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToaster = void 0;

var _react = require("react");

var _store = require("./store");

var _toast = require("./toast");

const useToaster = toastOptions => {
  const {
    toasts,
    pausedAt
  } = (0, _store.useStore)(toastOptions);
  (0, _react.useEffect)(() => {
    if (pausedAt) {
      return;
    }

    const now = Date.now();
    const timeouts = toasts.map(t => {
      if (t.duration === Infinity) {
        return;
      }

      const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);

      if (durationLeft < 0) {
        if (t.visible) {
          _toast.toast.dismiss(t.id);
        }

        return;
      }

      return setTimeout(() => _toast.toast.dismiss(t.id), durationLeft);
    });
    return () => {
      timeouts.forEach(timeout => timeout && clearTimeout(timeout));
    };
  }, [toasts, pausedAt]);
  const handlers = (0, _react.useMemo)(() => ({
    startPause: () => {
      (0, _store.dispatch)({
        type: _store.ActionType.START_PAUSE,
        time: Date.now()
      });
    },
    endPause: () => {
      if (pausedAt) {
        (0, _store.dispatch)({
          type: _store.ActionType.END_PAUSE,
          time: Date.now()
        });
      }
    },
    updateHeight: (toastId, height) => (0, _store.dispatch)({
      type: _store.ActionType.UPDATE_TOAST,
      toast: {
        id: toastId,
        height
      }
    }),
    calculateOffset: (toast, opts) => {
      const {
        reverseOrder = false,
        gutter = 8,
        defaultPosition
      } = opts || {};
      const relevantToasts = toasts.filter(t => (t.position || defaultPosition) === (toast.position || defaultPosition) && t.height);
      const toastIndex = relevantToasts.findIndex(t => t.id === toast.id);
      const toastsBefore = relevantToasts.filter((toast, i) => i < toastIndex && toast.visible).length;
      return relevantToasts.filter(t => t.visible).slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore])).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
    }
  }), [toasts, pausedAt]);
  return {
    toasts,
    handlers
  };
};

exports.useToaster = useToaster;
//# sourceMappingURL=use-toaster.js.map