// You are free to use alternative approaches of
// defining BackboneModel as long as the
// default export can be instantiated.
export default class BackboneModel {
  /**
   * @param {Object} initialValues
   * @returns BackboneModel
   */
  constructor(initialValues = {}) {
    this._attributes = new Map();
    Object.entries(initialValues).forEach(([attribute, value]) => {
      this._attributes.set(attribute, {
        value,
        events: {
          change: [],
          unset: [],
        },
      });
    });
  }

  /**
   * Get the value of a specific attribute.
   * @param {string} attribute - The attribute name.
   * @returns {any | undefined} The value of the attribute.
   */
  get(attribute) {
    return this._attributes.get(attribute)?.value;
  }

  /**
   * Set the value of a specific attribute.
   * @param {string} attribute - The attribute name.
   * @param {any} value - The value to set for the attribute.
   */
  set(attribute, value) {
    const attributeData = this.has(attribute)
      ? this._attributes.get(attribute)
      : {
          value,
          events: {
            change: [],
            unset: [],
          },
        };

    // Only invoke callbacks if there's a change in the values.
    if (attributeData.value !== value) {
      // Invoke callbacks listening for the `change` event.
      attributeData.events.change.forEach((callback) => {
        callback.fn.call(
          callback.context ?? null,
          attribute,
          value,
          attributeData.value,
        );
      });
    }

    attributeData.value = value;
    this._attributes.set(attribute, attributeData);
  }

  /**
   * Check if the model has a specific attribute.
   * @param {string} attribute - The attribute name.
   * @returns {boolean} `true` if the model has the attribute, `false` otherwise.
   */
  has(attribute) {
    return this._attributes.has(attribute);
  }

  /**
   * Unset a specific attribute.
   * @param {string} attribute - The attribute name to unset.
   */
  unset(attribute) {
    const attributeData = this._attributes.get(attribute);
    // No-op for non-existent attributes.
    if (attributeData == null) {
      return;
    }

    // Invoke callbacks listening for the `unset` event.
    attributeData.events.unset.forEach((callback) => {
      callback.fn.call(callback.context ?? null, attribute);
    });
    // Remove the attribute entirely.
    this._attributes.delete(attribute);
  }

  /**
   * Register an event listener for changes to a specific attribute.
   * @param {string} eventName - The event name.
   * @param {string} attribute - The attribute name to listen for changes.
   * @param {Function} callback - The callback function to be executed on the event.
   * @param {any} [context] - The context in which to execute the callback.
   */
  on(eventName, attribute, callback, context) {
    const attributeData = this._attributes.get(attribute);
    // No-op for non-existent attributes.
    if (attributeData == null) {
      return;
    }

    // Add to the list of callbacks.
    attributeData.events[eventName].push({
      fn: callback,
      context,
    });
  }

  /**
   * Remove an event listener for changes to a specific attribute.
   * @param {string} eventName - The event name.
   * @param {string} attribute - The attribute name to stop listening for changes.
   * @param {Function} callback - The callback function to remove.
   */
  off(eventName, attribute, callback) {
    const attributeData = this._attributes.get(attribute);
    // No-op for non-existent attributes.
    if (attributeData == null) {
      return;
    }

    // Remove from the added list of callbacks.
    attributeData.events[eventName] = attributeData.events[eventName].filter(
      ({ fn }) => fn !== callback,
    );
  }
}
