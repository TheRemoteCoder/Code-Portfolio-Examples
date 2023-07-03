import Singleton from '../../lib/singleton';

/**
 * Helper methods for any DOM operations;
 * e.g. changing screen content.
 *
 * - Constructor
 * - General
 * - Screens
 */
export default class HelperDom extends Singleton {
  /**
   * CSS class mapping for DOM interactions.
   */
  private classes: any = {
    screenStates: {
      active: '--is-active', // Toggle; Hidden by default
    },
  };

  /** @type {Document} */
  private doc: any;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set Singleton state and set DOM document reference.
   */
  constructor() {
    super(HelperDom);

    this.doc = document;
  }

  // ----------------------------------------------------------------------------------------------------------- General

  /**
   * Add one or more classes from one or more elements.
   *
   * @param  {string}  classNames       Class name(s) without '.' prefix.
   * @param  {string}  elementSelector  Fully qualified CSS selector.
   */
  public addClass(classNames: string, elementSelector: string): void {
    const element = this.doc.querySelectorAll(elementSelector);

    element.forEach((el, index, list) => {
      el.classList.add(classNames);
    });
  }

  /**
   * Remove one or more classes from one or more elements.
   *
   * @param  {string}  classNames       Class name(s) without '.' prefix.
   * @param  {string}  elementSelector  Fully qualified CSS selector.
   */
  public removeClass(classNames: string, elementSelector: string): void {
    const element = this.doc.querySelectorAll(elementSelector);

    element.forEach((el, index, list) => {
      el.classList.remove(classNames);
    });
  }

  // ----------------------------------------------------------------------------------------------------------- Screens

  /**
   * Toggle screen: Remove active state class from an element by its ID.
   *
   * @param  {string}  elementId  ID name without '.' prefix.
   */
  public toggleScreen(elementId: string, show: boolean): void {
    const element = this.doc.getElementById(elementId);
    const name = this.classes.screenStates.active;

    if (show) {
      element.classList.add(name);
    } else {
      element.classList.remove(name);
    }
  }
}
