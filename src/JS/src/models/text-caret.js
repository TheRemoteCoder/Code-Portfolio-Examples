/**
 * Text input element and caret position data.
 *
 * Shared state data - No instances required.
 */
export default class TextCaretModel {
  /**
   * Form input element, caret position and text.
   *
   * Content
   * - element       : HTML element reference (last used form input element)
   * - caretPosition : Caret position within form input element
   * - text          : Form input element text
   */
  static data = {
    element: null,
    caretPosition: 0,
    text: '',
  };

  /**
   * Set model data for element, caret position and text.
   *
   * @param {Object} element HTML element - Form text input
   * @param {Number} caretPosition Last position in form text input
   * @param {String} text Form text element value
   * @param {String} key
   * @param {Null|Number|String} val
   */
  static setData(element, caretPosition, text) {
    TextCaretModel.data = {
      element,
      caretPosition: +caretPosition,
      text,
    };
  }

  /**
   * Get model data for element, caret position and text.
   *
   * @return {Object} data
   */
  get data() {
    return TextCaretModel.data;
  }
}
