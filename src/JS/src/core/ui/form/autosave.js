import UiFormAbstractCore from './abstract';

/**
 * Realtime form autosave of any changes.
 */
export default class UiFormAutosaveCore extends UiFormAbstractCore {
  /**
   * Constructor sets dependencies.
   *
   * @param {Object} storageLib
   */
  constructor(storageLib) {
    super();

    this.storageLib = storageLib;

    this.storeKey = 'id';
  }

  /**
   * Bind events.
   *
   * @public
   */
  init() {
    this.bindEvents();
  }

  /**
   * Bind form field events.
   * Must be called after all dynamic DOM elements have been generated.
   *
   * @private
   */
  bindEvents() {
    const { win } = this;
    const onUpdate = this.onUpdate.bind(this);

    win.addEventListener('change', onUpdate);
    win.addEventListener('input', onUpdate);
  }

  /**
   * On form field update save its data by type.
   *
   * @param {Object} event
   * @private
   */
  onUpdate(event) {
    const field = event.target;

    if (this.canSave(field)) {
      this.saveIfBooleanField(field);
      this.saveIfTextField(field);
    }
  }

  /**
   * Set boolean field from storage data.
   *
   * @param {Object} field HTML element
   * @private
   */
  saveIfBooleanField(field) {
    const isBooleanField = this.uiFormLib.isBooleanField(field);

    if (isBooleanField) {
      this.storageLib.set(field[this.storeKey], field.checked);
    }
  }

  /**
   * Set text field from storage data.
   *
   * @param {Object} field HTML element
   * @private
   */
  saveIfTextField(field) {
    const isTextTypeField = this.uiFormLib.isTextTypeField(field);

    if (isTextTypeField) {
      this.storageLib.set(field[this.storeKey], field.value);
    }
  }
}
