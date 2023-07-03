// Libraries
import SanitizerLib from '../sanitizer';

/**
 * Dynamic component element text/HTML replacement
 * with simple public methods for convenience.
 */
export default class DomTextLib {
  /**
   * Constructor sets dependencies.
   *
   * @param {Object} component Component element reference from parent class as 'this' scope
   * @param {Object} texts Texts from API data {[string]:string}
   */
  constructor(component, texts) {
    this.sanitizerLib = new SanitizerLib();

    this.component = component;
    this.texts = texts;

    this.selector = 'data-x-text';
  }

  /**
   * Set element HTML.
   *
   * @param {String} key Content key from API data
   * @public
   */
  setHtmlForKey(key) {
    this.updateElement(key, true);
  }

  /**
   * Set element text/HTML, if available.
   *
   * @param {String} key Content key from API data
   * @param {Boolean} isHtml Set if to use plain text or HTML.
   * @private
   */
  updateElement(key, isHtml = false) {
    const element = this.getElementForKey(key);
    const text = this.getTextForKey(key);

    if (!text) {
      return;
    }

    const safeText = this.sanitizerLib.sanitize(text, { ADD_ATTR: ['target'] });

    if (isHtml) {
      element.innerHTML = safeText;
    } else {
      element.textContent = safeText;
    }

    this.showElement(element);
  }

  /**
   * Get element for key or fail.
   *
   * @param {String} text
   * @return {String}
   * @private
   */
  getElementForKey(key) {
    const element = this.component.querySelector(`[${this.selector}='${key}']`);

    if (!element) {
      throw new Error(`No element found for key: ${key}`);
    }

    return element;
  }

  /**
   * Get text for key from API data, if available.
   * Return empty string if none is found.
   *
   * @param {String} key Content key from API data
   * @return {String}
   * @private
   */
  getTextForKey(key) {
    const textData = this.texts.filter((item) => item.slug === key);
    const hasTextData = textData && textData.length;

    return hasTextData ? textData[0].content : '';
  }

  /**
   * Show element by removing CSS attribute.
   * It's set to hide empty elements by default.
   *
   * @param {Object} Element reference
   * @private
   */
  showElement(element) {
    element.removeAttribute(this.selector);
  }
}
