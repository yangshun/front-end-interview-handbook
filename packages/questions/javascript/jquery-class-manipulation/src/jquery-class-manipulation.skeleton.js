/**
 * @param {string} selector
 * @return {{toggleClass: Function, addClass: Function, removeClass: Function}}
 */
export default function $(selector) {
  const element = document.querySelector(selector);

  return {
    /**
     * @param {string} className
     * @param {boolean} [state]
     * @return {Object|void}
     */
    toggleClass: function (className, state) {
      throw 'Not implemented!';
    },
    /**
     * @param {string} className
     * @return {Object}
     */
    addClass: function (className) {
      throw 'Not implemented!';
    },
    /**
     * @param {string} className
     * @return {Object}
     */
    removeClass: function (className) {
      throw 'Not implemented!';
    },
  };
}
