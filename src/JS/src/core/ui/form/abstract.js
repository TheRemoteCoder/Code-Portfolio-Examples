// Libraries
import UiFormLib from '../../../lib/ui/form';

/**
 * Form data saving.
 */
export default class UiFormAbstractCore {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    this.uiFormLib = new UiFormLib();
    this.win = window;

    this.attribute = {
      selector: '[data-x-save]',
      key: 'xSave', // ^= data-x-save
    };
  }

  /**
   * Get if field can be saved by attribute.
   *
   * @param {Object} field HTML element
   * @return {Boolean}
   * @protected
   */
  canSave(field) {
    return field.dataset[this.attribute.key] !== undefined;
  }

  /**
   * Get all fields that can be saved by attribute.
   *
   * @return {Boolean}
   * @protected
   */
  getFields() {
    return document.querySelectorAll(this.attribute.selector);
  }
}
