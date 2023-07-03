// Libraries
import SanitizerLib from '../lib/sanitizer';

/**
 * Sanitize and format raw API data for output.
 */
export default class ViewApiDataHelper {
  /**
   * Constructor sets dependencies.
   *
   * @param {Object} apiData
   */
  constructor(apiData) {
    this.apiData = apiData;
    this.sanitizerLib = new SanitizerLib();

    this.config = {};
  }

  /**
   * Get example data.
   *
   * @return {Number}
   * @public
   */
  getExampleData() {
    const { example } = this.apiData;
    const count = example.length;

    if (Number.isNaN(count)) {
      throw new Error('Count is NaN - Check config value');
    }

    return count;
  }
}
