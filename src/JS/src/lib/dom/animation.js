/**
 * DOM tools - Animate element visibility.
 */
export default class DomAnimationLib {
  /**
   * Constructor sets properties.
   */
  constructor() {
    this.selectors = {
      fade: 'x-a-fade',
    };
  }

  /**
   * Fade-out element by CSS class.
   *
   * @param {Object} element HTML element
   * @public
   */
  fadeOutElement(element) {
    element.classList.remove(this.selectors.fade);
  }

  /**
   * Fade-in element by CSS class.
   *
   * Timeout is a browser engine 'hack' to re-trigger
   * selector change that otherwise is not recognized.
   *
   * @param {Object} element HTML element
   * @public
   */
  fadeInElement(element) {
    const selector = this.selectors.fade;

    element.classList.remove(selector);

    window.setTimeout(() => {
      element.classList.add(selector);
    }, 1);
  }
}
