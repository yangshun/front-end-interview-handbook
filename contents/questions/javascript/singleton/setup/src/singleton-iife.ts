const GlobalMap = (function () {
  const _privateMap = new Map();

  return {
    getInstance: function () {
      return _privateMap;
    },
  };
})();

export default GlobalMap;
