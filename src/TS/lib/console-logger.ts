import Singleton from './singleton';

/**
 * Console output logger.
 *
 * - Constructor
 * - Logging
 *
 * @todo Outsource config/state or implement in build variants (use .env file?).
 */
export class ConsoleLogger extends Singleton {
  /**
   * Set if logger is active.
   */
  private static enabled: boolean = false;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Constructor sets Singleton state.
   */
  protected constructor() {
    super(ConsoleLogger);
  }

  // ----------------------------------------------------------------------------------------------------------- Logging

  /**
   * Log message and any kind of data to defined output.
   */
  public static log(message: string, ...data: any): void {
    console.warn('ConsoleLogger.log()');

    if (!ConsoleLogger.enabled) {
      return;
    }

    if (message) {
      console.log(`> ${message}`);
    }

    if (data && data.length) {
      console.log(data);
    }

    if (!console.log) {
      throw Error('console.log() must exist in order to use `ConsoleLogger`.');
    }
  }
}
