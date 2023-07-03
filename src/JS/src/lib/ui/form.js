/**
 * Form UI toolset.
 *
 * Implementation is limited to the current needs and
 * deliberately excludes any other fields for simplicity.
 */
export default class UiFormLib {
  /**
   * Test if element is a field for checkbox values.
   *
   * @param {Object} element HTML element
   * @return {Boolean}
   * @public
   */
  isBooleanField(element) {
    return element.type === 'checkbox';
  }

  /**
   * Test if element is a field for text values.
   *
   * @param {Object} element HTML element
   * @return {Boolean}
   * @public
   */
  isTextTypeField(element) {
    return element.type === 'text' || this.isTextareaField(element);
  }

  /**
   * Test if element is a textarea field.
   *
   * @param {Object} element HTML element
   * @return {Boolean}
   * @public
   */
  isTextareaField(element) {
    return element.type === 'textarea';
  }
}
