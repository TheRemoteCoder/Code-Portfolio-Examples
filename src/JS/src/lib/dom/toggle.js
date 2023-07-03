/**
 * DOM tools - Change element visibility.
 */
export default class DomToggleLib {
  /**
   * Constructor sets properties.
   */
  constructor() {
    this.selectors = {
      toggleVisibility: 'data-x-show',
    };
  }

  /**
   * Hide element by attribute.
   *
   * @param {Object} element HTML element
   * @public
   */
  hideElement(element) {
    element.setAttribute(this.selectors.toggleVisibility, 0);
  }

  /**
   * Show element by attribute.
   *
   * @param {Object} element HTML element
   * @public
   */
  showElement(element) {
    element.setAttribute(this.selectors.toggleVisibility, 1);
  }
}
