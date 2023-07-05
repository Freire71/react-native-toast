"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useToaster: true,
  Toasts: true,
  ToastPosition: true
};
Object.defineProperty(exports, "ToastPosition", {
  enumerable: true,
  get: function () {
    return _types.ToastPosition;
  }
});
Object.defineProperty(exports, "Toasts", {
  enumerable: true,
  get: function () {
    return _components.Toasts;
  }
});
Object.defineProperty(exports, "useToaster", {
  enumerable: true,
  get: function () {
    return _useToaster.useToaster;
  }
});

var _useToaster = require("./core/use-toaster");

var _components = require("./components");

var _headless = require("./headless");

Object.keys(_headless).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _headless[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _headless[key];
    }
  });
});

var _types = require("./core/types");
//# sourceMappingURL=index.js.map