// Libraries
import StateLib from '../../lib/state';

// Models
import ContentModel from '../../models/content';

/**
 * Introductory text modal - State management.
 */
export default class StateModalIntroView {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    const uniqueId = new ContentModel().getUniqueId();

    this.stateLib = new StateLib(uniqueId, 'modal_intro', {
      alreadyOpened: false,
    });
  }

  /**
   * Get if modal already has been opened.
   *
   * @return {Boolean}
   * @public
   */
  hasAlreadyBeenOpened() {
    return !!this.stateLib.get('alreadyOpened');
  }

  /**
   * Set modal has been opened.
   *
   * @public
   */
  setHasBeenOpened() {
    this.stateLib.update({ alreadyOpened: true });
  }
}
