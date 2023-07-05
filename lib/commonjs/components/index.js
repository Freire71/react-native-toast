"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Toasts = require("./Toasts");

Object.keys(_Toasts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Toasts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Toasts[key];
    }
  });
});
//# sourceMappingURL=index.js.map