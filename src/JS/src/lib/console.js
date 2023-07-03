/**
 * Console logging wrapper.
 *
 * @example
 *   this.consoleLib.error('Message', {details: 123});
 *   this.consoleLib.info([true, false]);
 *   this.consoleLib.log('Message');
 *   this.consoleLib.warn(1, 2, 3);
 */
export default class ConsoleLib {
  /**
   * Constructor sets properties.
   */
  constructor() {
    this.console = window.console;
  }

  /**
   * Log error type message.
   *
   * @param {Array} args Arbitrary arguments
   * @public
   */
  error(...args) {
    this.display('error', args);
  }

  /**
   * Log info type message.
   *
   * @param {Array} args Arbitrary arguments
   * @public
   */
  info(...args) {
    this.display('info', args);
  }

  /**
   * Log log type message.
   *
   * @param {Array} args Arbitrary arguments
   * @public
   */
  log(...args) {
    this.display('log', args);
  }

  /**
   * Log warning type message.
   *
   * @param {Array} args Arbitrary arguments
   * @public
   */
  warn(...args) {
    this.display('warn', args);
  }

  /**
   * Log message of any type to console.
   * Fall back to safe 'log' method in case others don't exist.
   *
   * @param {String} method Console API method name
   * @param {Array} args Arbitrary arguments
   * @private
   */
  display(methodName, args) {
    // eslint-disable-next-line prefer-destructuring
    const console = this.console;
    const argsParsed = this.getArguments(args);

    if (console[methodName]) {
      // eslint-disable-next-line prefer-spread
      console[methodName].apply(console, argsParsed);
    } else {
      console.log(argsParsed);
    }
  }

  /**
   * Get arbitrary arguments as array.
   *
   * @param {Array} args Arbitrary arguments
   * @private
   */
  getArguments(args) {
    return Array.isArray(args) ? args : [args];
  }
}
