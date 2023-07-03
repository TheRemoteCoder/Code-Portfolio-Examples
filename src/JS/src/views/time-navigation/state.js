// Libraries
import StateLib from '../../lib/state';

// Models
import ContentModel from '../../models/content';

/**
 * Time index navigation - State management.
 */
export default class StateTimeNavigationView {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    const uniqueId = new ContentModel().getUniqueId();

    this.stateLib = new StateLib(uniqueId, 'time_navigation', {
      activeItems: [
        // Numbers 1-N
      ],
    });
  }

  /**
   * Get active items as form IDs.
   *
   * @return {Array} Numbers
   * @public
   */
  getActiveItems() {
    return this.stateLib.get('activeItems');
  }

  /**
   * Get current time index or fallback to default index.
   *
   * @return {Number}
   * @public
   */
  getCurrentIndex() {
    return this.stateLib.get('currentIndex') ?? 1;
  }

  /**
   * Set active items.
   *
   * @param {Array} items
   * @public
   */
  setActiveItems(items) {
    this.stateLib.update({ activeItems: items });
  }

  /**
   * Set current index.
   *
   * @param {Number} index
   * @public
   */
  setCurrentIndex(index) {
    this.stateLib.update({ currentIndex: +index });
  }
}
