/**
 * @param {number} index
 * @return {any | undefined}
 */
Array.prototype.myAt = function (index) {
  const idx = Number(index);
  const len = this.length;
  if (idx < -len || idx >= len) {
    return;
  }

  return this[(idx + len) % len];
};
