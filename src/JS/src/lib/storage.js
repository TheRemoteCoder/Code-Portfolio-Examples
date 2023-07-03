// Libraries
import SanitizerLib from './sanitizer';

/**
 * LocalStorage saving mechanism.
 * Save each piece of information individually under a unique key.
 *
 * @todo Decide - Convert to static?
 */
export default class StorageLib {
  /**
   * Constructor sets dependencies.
   *
   * @param {String} prefix
   */
  constructor(prefix) {
    this.prefix = prefix;
    this.sanitizerLib = new SanitizerLib();

    this.storage = window.localStorage;
  }

  /**
   * Save item in storage by key.
   *
   * @param {String} key
   * @param {String} val
   * @public
   */
  set(key, val) {
    const uniqueKey = this.getUniqueKey(key);

    return this.storage.setItem(uniqueKey, val);
  }

  /**
   * Get item from storage by key.
   *
   * @param {String} key
   * @return {String} Value
   * @public
   */
  get(key) {
    const uniqueKey = this.getUniqueKey(key);
    const val = this.storage.getItem(uniqueKey);

    return this.sanitizerLib.sanitize(val);
  }

  /**
   * Remove item from storage by key.
   *
   * @param {String} key
   * @public
   */
  remove(key) {
    const uniqueKey = this.getUniqueKey(key);

    this.storage.removeItem(uniqueKey);
  }

  /**
   * Get unique storage item identifier for a key.
   *
   * @param {String} key
   * @private
   */
  getUniqueKey(key) {
    return `${this.prefix}_${key}`;
  }
}
