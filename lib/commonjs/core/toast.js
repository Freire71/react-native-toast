"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toast = void 0;

var _types = require("./types");

var _utils = require("./utils");

var _store = require("./store");

const createToast = function (message) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'blank';
  let opts = arguments.length > 2 ? arguments[2] : undefined;
  return {
    createdAt: Date.now(),
    visible: true,
    type,
    message,
    pauseDuration: 0,
    position: _types.ToastPosition.TOP,
    providerKey: 'DEFAULT',
    ...opts,
    id: (opts === null || opts === void 0 ? void 0 : opts.id) || (0, _utils.genId)()
  };
};

const createHandler = type => (message, options) => {
  const toast = createToast(message, type, options);
  (0, _store.dispatch)({
    type: _store.ActionType.UPSERT_TOAST,
    toast
  });
  return toast.id;
};

const toast = (message, opts) => createHandler('blank')(message, opts);

exports.toast = toast;
toast.error = createHandler('error');
toast.success = createHandler('success');
toast.loading = createHandler('loading');

toast.dismiss = toastId => {
  (0, _store.dispatch)({
    type: _store.ActionType.DISMISS_TOAST,
    toastId
  });
};

toast.remove = toastId => (0, _store.dispatch)({
  type: _store.ActionType.REMOVE_TOAST,
  toastId
});

toast.promise = (promise, msgs, opts) => {
  const id = toast.loading(msgs.loading, { ...opts,
    ...(opts === null || opts === void 0 ? void 0 : opts.loading)
  });
  promise.then(p => {
    toast.success((0, _types.resolveValue)(msgs.success, p), {
      id,
      ...opts,
      ...(opts === null || opts === void 0 ? void 0 : opts.success)
    });
    return p;
  }).catch(e => {
    toast.error((0, _types.resolveValue)(msgs.error, e), {
      id,
      ...opts,
      ...(opts === null || opts === void 0 ? void 0 : opts.error)
    });
  });
  return promise;
};
//# sourceMappingURL=toast.js.map