/**
 * Scrolling behaviour.
 */
export default class UiScrollLib {
  /**
   * Scroll element into focus.
   * Quit if browser doesn't support it.
   *
   * @param {Object} selector
   * @public
   */
  scrollTo(selector) {
    if (!this.isSupported()) {
      return;
    }

    const element = document.getElementById(selector);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  /**
   * Check browser support.
   *
   * @return {Boolean}
   * @private
   */
  isSupported() {
    return document.querySelector('html').scrollIntoView;
  }
}
