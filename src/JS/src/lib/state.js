// Libraries
import SanitizerLib from './sanitizer';
import StorageLib from './storage';

/**
 * State persistence.
 *
 * Can be used 'readonly' without setting own state.
 */
export default class StateLib {
  /**
   * Constructor sets dependencies.
   *
   * @param {String} uniqueId Unique storage prefix ID
   * @param {String} key Storage key ID - Format: [a-zA-Z_]
   * @param {Object} defaultState Optional: Arbitrary data | null (Readonly intent)
   */
  constructor(uniqueId, key, defaultState) {
    this.sanitizerLib = new SanitizerLib();
    this.storageLibRef = new StorageLib(uniqueId);

    this.key = key;
    this.defaultState = defaultState ?? null;

    this.init();
  }

  /**
   * Initialize library with given default state;
   * else ignore for readonly intent.
   *
   * @private
   */
  init() {
    if (!this.defaultState) {
      return;
    }

    this.state = {
      ...this.defaultState,
    };

    this.update({});
  }

  /**
   * Get item from storage and return its value.
   *
   * @param {String} itemKey Item identifier within storage
   * @return {*}
   * @public
   */
  get(itemKey) {
    const data = this.load();

    return data[itemKey];
  }

  /**
   * Update existing state with new ones.
   * Merge default with previous and latest state.
   *
   * @param {Object} nextState Arbitrary data
   * @public
   */
  update(nextState) {
    const previousState = this.load();

    this.state = {
      ...this.state,
      ...(previousState || {}),
      ...(nextState || {}),
    };

    this.save();
  }

  /**
   * Load state from storage or return previous.
   *
   * @return {Object}
   * @private
   */
  load() {
    const rawStr = this.storageLibRef.get(this.key);
    const jsonStr = this.sanitizerLib.sanitize(rawStr);

    return jsonStr ? JSON.parse(jsonStr) : this.state;
  }

  /**
   * Save state in storage.
   *
   * @private
   */
  save() {
    const jsonStr = JSON.stringify(this.state);

    this.storageLibRef.set(this.key, jsonStr);
  }
}
