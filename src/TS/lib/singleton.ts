/**
 * Singleton pattern provider.
 *
 * - Constructor
 * - Instances
 */
export default abstract class Singleton {
  /**
   * Class instance storage.
   */
  protected static instance;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Return stored instance.
   */
  constructor(T: any) {
    if (T.instance) {
      return T.instance;
    }
  }

  // --------------------------------------------------------------------------------------------------------- Instances

  /**
   * Get stored or create new class instance.
   */
  public static getInstance(T: any): any {
    if (T.instance) {
      return T.instance;
    }

    return (T.instance = new T());
  }
}
