/**
 * Application browser compatibility.
 *
 * Known incompatibilities
 * - Browsers without support of 'Custom elements' (e.g. older IE Edge versions)
 */
export default class TooltipsHelper {
  /**
   * Constructor sets properties.
   */
  constructor() {
    this.win = window;

    this.config = {
      notSupported:
        'Unfortunately, your browser does not support this application. Please change or update your browser.\n\nFor developers: "window.customElements.define" required.',
    };
  }

  /**
   * Check compatibility.
   *
   * @public
   */
  init() {
    const hasCustomElementSupport = this.win.customElements && this.win.customElements.define;

    if (!hasCustomElementSupport) {
      // eslint-disable-next-line no-alert
      alert(this.config.notSupported);
    }
  }
}
