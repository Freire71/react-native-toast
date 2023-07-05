"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useKeyboard = require("./useKeyboard");

Object.keys(_useKeyboard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useKeyboard[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useKeyboard[key];
    }
  });
});

var _styles = require("./styles");

Object.keys(_styles).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _styles[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _styles[key];
    }
  });
});

var _useVisibilityChange = require("./useVisibilityChange");

Object.keys(_useVisibilityChange).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useVisibilityChange[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useVisibilityChange[key];
    }
  });
});
//# sourceMappingURL=index.js.map