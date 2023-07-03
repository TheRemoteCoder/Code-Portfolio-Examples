// Libraries
import SanitizerLib from './sanitizer';

/**
 * HTTP requests.
 */
export default class RequestLib {
  /**
   * Constructor sets properties.
   */
  constructor() {
    this.sanitizerLib = new SanitizerLib();

    this.params = window.location.search;
  }

  /**
   * Send GET request.
   *
   * @param {String} url
   * @return {Object} Promise HTTP request
   * @public
   */
  get(url) {
    const options = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
      },
    };

    return this.request(url, options);
  }

  /**
   * Send POST request.
   *
   * @param {String} url
   * @param {Object} formData
   * @return {Object} Promise HTTP request
   * @public
   */
  post(url, formData) {
    const body = new URLSearchParams(formData).toString();

    const options = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    };

    return this.request(url, options);
  }

  /**
   * Send HTTP request for URL and parameters in given mode via 'fetch'.
   *
   * @param {String} url
   * @param {Object} options
   * @return {Object} Promise HTTP request
   * @private
   */
  request(url, options) {
    const urlWithParams = this.getUrlWithParams(url);

    return fetch(urlWithParams, options)
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(error.stack);
      });
  }

  /**
   * Get sanitized URL with parameters.
   *
   * @param {String} url
   * @return {String}
   * @private
   */
  getUrlWithParams(url) {
    const params = `?${new URLSearchParams(this.params).toString()}`;

    return this.sanitizerLib.sanitize(url + params);
  }
}
