/**
 * @param {string} selector
 * @return {{css: Function}}
 */
export default function $(selector) {
  const element = document.querySelector(selector);

  return {
    /**
     * @param {string} prop
     * @param {boolean|string|number} value
     * @return {Object|void|string}
     */
    css: function (prop, value) {
      // Getter case.
      if (value === undefined) {
        // No matching elements.
        if (element == null) {
          return undefined;
        }

        const value = element.style[prop];
        return value === '' ? undefined : value;
      }

      // Setter case.
      if (element != null) {
        element.style[prop] = value;
      }

      return this;
    },
  };
}
