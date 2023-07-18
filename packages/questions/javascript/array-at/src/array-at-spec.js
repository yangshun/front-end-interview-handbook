/**
 * @param {number} index
 * @return {any | undefined}
 */
Array.prototype.myAt = function (index) {
  const len = this.length;
  const relativeIndex = Number(index);
  const k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;

  if (k < 0 || k >= len) {
    return undefined;
  }

  return this[k];
};
