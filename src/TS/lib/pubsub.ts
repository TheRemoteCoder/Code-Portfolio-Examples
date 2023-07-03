import Singleton from './singleton';

/**
 * Publish/Subscribe pattern.
 *
 * - Constructor
 * - Subscriptions
 *
 * @todo  Fix: Binding to window object will break instanciated classes that have use the listeners!
 * @todo  Replace by DOM-independent Event/Observer pattern (or integrate both)?
 */
export default class PubSub extends Singleton {
  /** @type {Window} */
  private win: any;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set Singleton state and set DOM window reference.
   */
  protected constructor() {
    super(PubSub);

    this.win = window;
  }

  // ----------------------------------------------------------------------------------------------------- Subscriptions

  /**
   * Publish DOM window event with optional data payload.
   */
  public publish(name: string, data?: any): void {
    const event = new CustomEvent(name, {
      bubbles: false,
      detail: data,
    });

    this.win.dispatchEvent(event);
  }

  /**
   * Subscribe event listener to DOM window object.
   */
  public subscribe(eventName: string, callbackFunction: any, once: boolean = false): void {
    this.win.addEventListener(eventName, callbackFunction, { once });
  }

  /**
   * Unsubscribe event listener from DOM window object.
   */
  public unsubscribe(eventName: string, listenerFunction: any): void {
    this.win.removeEventListener(eventName, listenerFunction);
  }
}
