// Libraries
import DomAnimationLib from '../lib/dom/animation';
import DomGenerateLib from '../lib/dom/generate';
import DomToggleLib from '../lib/dom/toggle';
import SanitizerLib from '../lib/sanitizer';

/**
 * Abstract view render with markup output helpers.
 * Offers string sanitizing to avoid XSS when handling data output.
 */
export default class AbstractRenderView {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    this.domAnimationLib = new DomAnimationLib();
    this.domGenerateLib = new DomGenerateLib();
    this.domToggleLib = new DomToggleLib();
    this.sanitizerLib = new SanitizerLib();
  }

  /**
   * Sanitize string value from untrusted sources.
   *
   * Convenience shortcut to avoid reimporting dependencies.
   *
   * @param {String} raw
   * @return {String}
   * @protected
   */
  getSafeValue(raw) {
    return this.sanitizerLib.sanitize(raw);
  }
}
