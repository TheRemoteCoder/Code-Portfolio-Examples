// Vendors
import DOMPurify from 'dompurify';

/**
 * Input sanitizer to prevent XSS.
 *
 * Wrapper for DomPurify.
 */
export default class SanitizerLib {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    this.sanitizerLib = DOMPurify;
  }

  /**
   * Get sanitized text.
   *
   * @param {String} text Unsafe text
   * @param {String} options Sanitizer library options
   * @return {String} Sanitized text
   * @public
   */
  sanitize(text, options) {
    return this.sanitizerLib.sanitize(text, options || {});
  }

  /**
   * Convert sanitized text back into readable values.
   *
   * 'DomPurify' in some occasions and combinations of '<' and '>' converts all of them to entities.
   * Sometimes text is even fully removed if it is considered to be part of a tag.
   * The source of the problem is any appearance of the starting bracket '<'.
   *
   * As this can easily happen by an accidental typo, and negatively affects the whole data,
   * we choose a mixed approach to ensure safety while still allowing user data to pass:
   *
   * 1. Let DomPurify clean the whole text in general.
   * 2. Fully remove the '<' bracket entity and add a whitespace.
   *    - Goal: Not accidentally combine words that should be separate, guessing users might use it here.
   * 3. Convert the '>' bracket back to readable form.
   *
   * @param {String} Text data from storage
   * @return {String}
   * @public
   */
  getConvertedSanitizedText(text) {
    const sanitizedText = this.sanitizerLib.sanitize(text);

    return sanitizedText.replace(/&lt;/g, ' ').replace(/&gt;/g, '>');
  }
}
