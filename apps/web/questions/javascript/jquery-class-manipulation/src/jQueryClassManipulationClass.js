function classNameTokenSet(className) {
  return new Set(className.trim().split(/\s+/));
}

class jQuery {
  constructor(selector) {
    this.element = document.querySelector(selector);
  }

  toggleClass(className, state) {
    // No-op if there is no matching element.
    if (this.element == null) {
      return undefined;
    }

    const classes = classNameTokenSet(className);
    const elementClasses = classNameTokenSet(this.element.className);

    classes.forEach((cls) => {
      const shouldRemove =
        state === undefined ? elementClasses.has(cls) : !state;
      shouldRemove
        ? elementClasses.delete(cls) // Remove if state is not defined and element contains the class or state is false.
        : elementClasses.add(cls);
    });

    this.element.className = Array.from(elementClasses).join(' ');
    return this;
  }
  addClass(className) {
    this.toggleClass(className, true);
    return this;
  }
  removeClass(className) {
    this.toggleClass(className, false);
    return this;
  }
}

export default function $(element) {
  return new jQuery(element);
}
