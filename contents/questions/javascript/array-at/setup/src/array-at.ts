interface Array<T> {
  myAt(index: number): T | undefined;
}

Array.prototype.myAt = function (index: number) {
  const len = this.length;
  if (index < -len || index >= len) {
    return;
  }

  return this[(index + len) % len];
};
