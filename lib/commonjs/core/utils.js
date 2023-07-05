"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genId = void 0;

const genId = (() => {
  let count = 0;
  return () => {
    return (++count).toString();
  };
})();

exports.genId = genId;
//# sourceMappingURL=utils.js.map