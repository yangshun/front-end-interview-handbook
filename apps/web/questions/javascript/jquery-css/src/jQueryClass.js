class jQuery {
  constructor(selector) {
    this.element = document.querySelector(selector);
  }

  css(prop, value) {
    // Getter case.
    if (value === undefined) {
      // No matching elements.
      if (this.element == null) {
        return undefined;
      }

      const value = this.element.style[prop];
      return value === '' ? undefined : value;
    }

    // Setter case.
    if (this.element != null) {
      this.element.style[prop] = value;
    }

    return this;
  }
}

export default function $(element) {
  return new jQuery(element);
}
