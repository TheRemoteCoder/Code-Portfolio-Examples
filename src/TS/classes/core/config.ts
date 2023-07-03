/**
 * Application settings and configuration.
 *
 * Concept: The class as 'data structure' allows dynamic modification of the config during runtime;
 * e.g. depending on certain environmental inputs or from restoring saved data.
 *
 * - Constructor
 * - Config
 */
export default class Config {
  /**
   * Global application settings for simplified central maintenance.
   */
  private static readonly config: { [key: string]: string | boolean | number } = {
    // ------------------------------------------------------ Layout + Animation

    /**
     * Delay between visual screen changes (animation time).
     *
     * @type  {number}  Milliseconds
     */
    preloaderDelay: 6000, // Default: 6000
    screenSwitchDelay: 3000, // Default: 3000

    // ----------------------------------------------------------- Game features

    /**
     * Set if to randomise quiz answer ordering.
     *
     *  @type  {boolean}
     */
    randomizeQuizAnswerOrder: true,

    /**
     * Set if to randomise quiz question ordering.
     *
     * @type  {boolean}
     */
    randomizeQuizScreenOrder: true,

    // --------------------------------------------------------------- Debugging

    /**
     * Debug option: Set if to all screens at once.
     * Warning: This will break layout and some functionality.
     *
     * @type  {boolean}
     */
    debugShowAllScreens: false,
  };

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Empty + Private: Only public static methods shall be used.
   */
  private constructor() {}

  // ------------------------------------------------------------------------------------------------------------- Config

  /**
   * Get config value from its name.
   */
  public static get(name: string): any | never {
    if (name in this.config) {
      return this.config[name];
    }

    throw Error(`Requested config parameter ${name} does not exist.`);
  }
}
