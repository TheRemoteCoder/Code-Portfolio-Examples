// Libraries
import SanitizerLib from './sanitizer';

/**
 * URLs and parameters.
 */
export default class UrlLib {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    this.sanitizerLib = new SanitizerLib();
    this.urlParameterString = window.location.search;
  }

  /**
   * Get sanitized parameter by key from URL.
   *
   * @return {String}
   * @public
   */
  getParam(key) {
    const params = this.getParams();
    const param = params.get(key);

    return this.sanitizerLib.sanitize(param);
  }

  /**
   * Get sanitized parameters from URL.
   *
   * @return {Object}
   * @public
   */
  getParams() {
    const paramString = this.sanitizerLib.sanitize(this.urlParameterString);

    return new URLSearchParams(paramString);
  }
}
