import { useEffect, useState } from 'react';
const TOAST_LIMIT = 20;
export let ActionType;

(function (ActionType) {
  ActionType[ActionType["ADD_TOAST"] = 0] = "ADD_TOAST";
  ActionType[ActionType["UPDATE_TOAST"] = 1] = "UPDATE_TOAST";
  ActionType[ActionType["UPSERT_TOAST"] = 2] = "UPSERT_TOAST";
  ActionType[ActionType["DISMISS_TOAST"] = 3] = "DISMISS_TOAST";
  ActionType[ActionType["REMOVE_TOAST"] = 4] = "REMOVE_TOAST";
  ActionType[ActionType["START_PAUSE"] = 5] = "START_PAUSE";
  ActionType[ActionType["END_PAUSE"] = 6] = "END_PAUSE";
})(ActionType || (ActionType = {}));

const toastTimeouts = new Map();

const addToRemoveQueue = toastId => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId: toastId
    });
  }, 1000);
  toastTimeouts.set(toastId, timeout);
};

const clearFromRemoveQueue = toastId => {
  const timeout = toastTimeouts.get(toastId);

  if (timeout) {
    clearTimeout(timeout);
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return { ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };

    case ActionType.UPDATE_TOAST:
      //  ! Side effects !
      if (action.toast.id) {
        clearFromRemoveQueue(action.toast.id);
      }

      return { ...state,
        toasts: state.toasts.map(t => t.id === action.toast.id ? { ...t,
          ...action.toast
        } : t)
      };

    case ActionType.UPSERT_TOAST:
      const {
        toast
      } = action;
      return state.toasts.find(t => t.id === toast.id) ? reducer(state, {
        type: ActionType.UPDATE_TOAST,
        toast
      }) : reducer(state, {
        type: ActionType.ADD_TOAST,
        toast
      });

    case ActionType.DISMISS_TOAST:
      const {
        toastId
      } = action; // ! Side effects ! - This could be execrated into a dismissToast() action, but I'll keep it here for simplicity

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach(toast => {
          addToRemoveQueue(toast.id);
        });
      }

      return { ...state,
        toasts: state.toasts.map(t => t.id === toastId || toastId === undefined ? { ...t,
          visible: false
        } : t)
      };

    case ActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return { ...state,
          toasts: []
        };
      }

      return { ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId)
      };

    case ActionType.START_PAUSE:
      return { ...state,
        pausedAt: action.time
      };

    case ActionType.END_PAUSE:
      const diff = action.time - (state.pausedAt || 0);
      return { ...state,
        pausedAt: undefined,
        toasts: state.toasts.map(t => ({ ...t,
          pauseDuration: t.pauseDuration + diff
        }))
      };
  }
};
const listeners = [];
let memoryState = {
  toasts: [],
  pausedAt: undefined
};
export const dispatch = action => {
  memoryState = reducer(memoryState, action);
  listeners.forEach(listener => {
    listener(memoryState);
  });
};
const defaultTimeouts = {
  blank: 4000,
  error: 4000,
  success: 2000,
  loading: Infinity
};
export const useStore = function () {
  let toastOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const [state, setState] = useState(memoryState);
  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  const mergedToasts = state.toasts.filter(t => (toastOptions === null || toastOptions === void 0 ? void 0 : toastOptions.providerKey) === undefined || t.providerKey === (toastOptions === null || toastOptions === void 0 ? void 0 : toastOptions.providerKey) || t.providerKey === 'PERSISTS').map(t => {
    var _toastOptions$t$type;

    return { ...toastOptions,
      ...toastOptions[t.type],
      ...t,
      duration: t.duration || ((_toastOptions$t$type = toastOptions[t.type]) === null || _toastOptions$t$type === void 0 ? void 0 : _toastOptions$t$type.duration) || (toastOptions === null || toastOptions === void 0 ? void 0 : toastOptions.duration) || defaultTimeouts[t.type],
      styles: { ...toastOptions.styles
      }
    };
  });
  return { ...state,
    toasts: mergedToasts
  };
};
//# sourceMappingURL=store.js.map