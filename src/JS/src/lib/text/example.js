/**
 * EXAMPLE - Algorithmic text search.
 */
export default class TextExampleLib {
  /**
   * Constructor sets properties.
   *
   * @param {Array} terms [string : [string]]
   */
  constructor(terms) {
    this.terms = terms;

    this.minLength = 3;
  }

  /**
   * Get text.
   * Return empty array if text is too short.
   *
   * @param {String} text
   * @return {Array}
   * @public
   */
  getText(text) {
    if (!this.isValid(text)) {
      return [];
    }

    // (Stripped for brevity)
    return false;
  }

  /**
   * Sort ascending and filter for unique values.
   *
   * @param {Array} result
   * @return {Array}
   * @private
   */
  getSortedUniqueResult(result) {
    return [...new Set(result)].sort();
  }

  /**
   * Normalize text.
   *
   * @param {String} input
   * @return {String}
   * @private
   */
  normalize(input) {
    return input ? input.toLowerCase().trim() : '';
  }

  /**
   * Test if input is valid and fulfils length requirement.
   *
   * @param {String} input
   * @private
   */
  isValid(input) {
    const text = this.normalize(input);

    return text && text.length >= this.minLength;
  }
}
