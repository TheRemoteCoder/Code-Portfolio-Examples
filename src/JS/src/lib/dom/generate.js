// Libraries
import SanitizerLib from '../sanitizer';

/**
 * DOM tools - Clone and insert elements.
 *
 * EXAMPLE: Stripped version to show different use cases.
 */
export default class DomGenerateLib {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    this.sanitizerLib = new SanitizerLib();
  }

  /**
   * Create many element for tag and append it to host elements HTML.
   * Texts can come from either array or object with string keys.
   *
   * @param {Object} hostElement HTML element
   * @param {Object|Array} texts Display texts: [string] | {[string]:[string]}
   * @param {Object} options Display options: {classes:'', tagContent:'', tagWrapper:''}
   * @public
   */
  appendElements(hostElement, texts, options) {
    const { classes, tagContent, tagWrapper } = options;
    let html = '';

    Object.keys(texts).forEach((text) => {
      const sanitizedText = this.getSafeValue(texts[text]);

      if (sanitizedText) {
        html += `<${tagContent} class="${classes}">${sanitizedText}</${tagContent}>`;
      }
    });

    // eslint-disable-next-line no-param-reassign
    hostElement.innerHTML += `<${tagWrapper}>${html}</${tagWrapper}>`;
  }

  /**
   * Clone one element and insert at adjacent position.
   *
   * @param {Object} element HTML element
   * @param {Object|Null} elementTarget HTML element to append to
   * @param {String} position Where to place cloned element
   * @return {Object} Cloned HTML element
   * @public
   */
  cloneElement(element, elementTarget = null, position = 'beforeend') {
    const clone = element.cloneNode(true);
    const target = elementTarget || element.parentNode;

    target.insertAdjacentElement(position, clone);

    return clone;
  }

  /**
   * Sanitize string value from untrusted sources.
   *
   * @param {String} raw Potentially unsafe input
   * @return {String} Sanitized string
   * @private
   */
  getSafeValue(raw) {
    return this.sanitizerLib.sanitize(raw);
  }
}
