interface JQuery {
  toggleClass: (className: string, state?: boolean) => JQuery;
  addClass: (className: string) => JQuery;
  removeClass: (className: string) => JQuery;
}

function classNameTokenSet(className: string): Set<string> {
  return new Set(className.trim().split(/\s+/));
}

export default function $(selector: string): JQuery {
  const element = document.querySelector(selector);

  return {
    toggleClass: function (className: string, state?: boolean): JQuery {
      // No-op if there is no matching element.
      if (element == null) {
        return this;
      }

      const classes = classNameTokenSet(className);
      const elementClasses = classNameTokenSet(element.className);

      classes.forEach((cls) => {
        const shouldRemove =
          state === undefined ? elementClasses.has(cls) : !state;
        shouldRemove
          ? elementClasses.delete(cls) // Remove if state is not defined and element contains the class or state is false.
          : elementClasses.add(cls);
      });

      element.className = Array.from(elementClasses).join(' ');
      return this;
    },
    addClass: function (className: string): JQuery {
      this.toggleClass(className, true);
      return this;
    },
    removeClass: function (className): JQuery {
      this.toggleClass(className, false);
      return this;
    },
  };
}
