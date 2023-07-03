// Core
import UiFormAbstractCore from './abstract';

// Libraries
import SanitizerLib from '../../../lib/sanitizer';

/**
 * Form autofilling from storage.
 */
export default class UiFormAutofillCore extends UiFormAbstractCore {
  /**
   * Constructor sets dependencies.
   *
   * @param {Object} storageLib
   */
  constructor(storageLib) {
    super();

    this.sanitizerLib = new SanitizerLib();
    this.storageLib = storageLib;

    this.storeKey = 'id';
  }

  /**
   * Fill form fields.
   *
   * @public
   */
  init() {
    this.fillFields();
  }

  /**
   * Fill form fields from storage by type.
   *
   * @private
   */
  fillFields() {
    const fields = this.getFields();

    fields.forEach((field) => {
      this.setIfBooleanField(field);
      this.setIfTextField(field);
    });
  }

  /**
   * Set boolean field from storage data.
   *
   * @param {Object} field HTML element
   * @private
   */
  setIfBooleanField(field) {
    const isBooleanField = this.uiFormLib.isBooleanField(field);
    const storedValue = this.storageLib.get(field.id);

    if (isBooleanField) {
      // eslint-disable-next-line no-param-reassign
      field.checked = storedValue === 'true';
    }
  }

  /**
   * Set text field from storage data.
   *
   * @param {Object} field HTML element
   * @private
   */
  setIfTextField(field) {
    const isTextTypeField = this.uiFormLib.isTextTypeField(field);
    const storedValue = this.storageLib.get(field[this.storeKey]);

    if (isTextTypeField) {
      const sanitizedText = this.sanitizerLib.getConvertedSanitizedText(storedValue);

      // eslint-disable-next-line no-param-reassign
      field.value = sanitizedText;
    }
  }
}
