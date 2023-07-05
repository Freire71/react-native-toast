export const genId = (() => {
  let count = 0;
  return () => {
    return (++count).toString();
  };
})();
//# sourceMappingURL=utils.js.map