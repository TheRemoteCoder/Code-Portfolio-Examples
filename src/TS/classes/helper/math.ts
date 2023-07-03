import Singleton from '../../lib/singleton';

/**
 * Helper methods for any math operations.
 *
 * - Constructor
 * - General
 * - Screens
 */
export default class HelperMath extends Singleton {
  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set Singleton state.
   */
  constructor() {
    super(HelperMath);
  }

  // ----------------------------------------------------------------------------------------------------------- General

  /**
   * Shuffle array items and return the randomised array.
   */
  public shuffleArray(arr: []): [] {
    const result = arr.sort(() => Math.random() - 0.5);

    return result;
  }
}
