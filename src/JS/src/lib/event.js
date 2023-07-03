/**
 * Custom events - Publish/Subscribe pattern.
 */
export default class EventLib {
  /**
   * Constructor sets properties.
   */
  constructor() {
    this.targetElement = window;
  }

  /**
   * Publish custom event with data.
   *
   * @param {String} eventName
   * @param {Object} data
   * @public
   */
  publish(eventName, data) {
    const ev = new CustomEvent(eventName, {
      detail: {
        data,
      },
    });

    this.targetElement.dispatchEvent(ev);
  }

  /**
   * Subscribe to custom event via callback.
   *
   * @param {String} eventName
   * @param {Function} callback
   * @public
   */
  subscribe(eventName, callback) {
    this.targetElement.addEventListener(eventName, callback, false);
  }
}
