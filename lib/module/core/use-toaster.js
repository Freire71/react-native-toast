import { useEffect, useMemo } from 'react';
import { ActionType, dispatch, useStore } from './store';
import { toast } from './toast';
export const useToaster = toastOptions => {
  const {
    toasts,
    pausedAt
  } = useStore(toastOptions);
  useEffect(() => {
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
          toast.dismiss(t.id);
        }

        return;
      }

      return setTimeout(() => toast.dismiss(t.id), durationLeft);
    });
    return () => {
      timeouts.forEach(timeout => timeout && clearTimeout(timeout));
    };
  }, [toasts, pausedAt]);
  const handlers = useMemo(() => ({
    startPause: () => {
      dispatch({
        type: ActionType.START_PAUSE,
        time: Date.now()
      });
    },
    endPause: () => {
      if (pausedAt) {
        dispatch({
          type: ActionType.END_PAUSE,
          time: Date.now()
        });
      }
    },
    updateHeight: (toastId, height) => dispatch({
      type: ActionType.UPDATE_TOAST,
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
//# sourceMappingURL=use-toaster.js.map