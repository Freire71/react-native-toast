import { resolveValue, ToastPosition } from './types';
import { genId } from './utils';
import { ActionType, dispatch } from './store';

const createToast = function (message) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'blank';
  let opts = arguments.length > 2 ? arguments[2] : undefined;
  return {
    createdAt: Date.now(),
    visible: true,
    type,
    message,
    pauseDuration: 0,
    position: ToastPosition.TOP,
    providerKey: 'DEFAULT',
    ...opts,
    id: (opts === null || opts === void 0 ? void 0 : opts.id) || genId()
  };
};

const createHandler = type => (message, options) => {
  const toast = createToast(message, type, options);
  dispatch({
    type: ActionType.UPSERT_TOAST,
    toast
  });
  return toast.id;
};

const toast = (message, opts) => createHandler('blank')(message, opts);

toast.error = createHandler('error');
toast.success = createHandler('success');
toast.loading = createHandler('loading');

toast.dismiss = toastId => {
  dispatch({
    type: ActionType.DISMISS_TOAST,
    toastId
  });
};

toast.remove = toastId => dispatch({
  type: ActionType.REMOVE_TOAST,
  toastId
});

toast.promise = (promise, msgs, opts) => {
  const id = toast.loading(msgs.loading, { ...opts,
    ...(opts === null || opts === void 0 ? void 0 : opts.loading)
  });
  promise.then(p => {
    toast.success(resolveValue(msgs.success, p), {
      id,
      ...opts,
      ...(opts === null || opts === void 0 ? void 0 : opts.success)
    });
    return p;
  }).catch(e => {
    toast.error(resolveValue(msgs.error, e), {
      id,
      ...opts,
      ...(opts === null || opts === void 0 ? void 0 : opts.error)
    });
  });
  return promise;
};

export { toast };
//# sourceMappingURL=toast.js.map