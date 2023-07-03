// Views
import AbstractRenderView from '../abstract-render';
import StateTimeNavigationView from './state';

/**
 * Time index navigation - Rendering.
 *
 * @todo Decide - Pass state via constructor (instead creating duplicate instance)
 */
export default class RenderTimeNavigationView extends AbstractRenderView {
  /**
   * Constructor sets dependencies and initializes component.
   *
   * @param {Object} component Component element reference from parent class as 'this' scope
   * @param {Object} data API data
   * @param {Object} viewApiDataHelper Class instance
   */
  constructor(component, data, viewApiDataHelper) {
    super();

    this.stateView = new StateTimeNavigationView();

    this.viewApiDataHelper = viewApiDataHelper;
    this.component = component;

    this.data = {
      exampleDetails: data.exampleDetails,
    };

    this.selectors = {
      index: 'data-x-time-navigation--index',
      control: 'data-x-time-navigation--control',
      active: 'btn-primary',
      selected: '--selected',
      timeless: '--timeless',
    };

    this.init();
  }

  /**
   * Initialize component.
   *
   * @private
   */
  init() {
    this.createButtons();
    this.updateButtons();
  }

  /**
   * Set visible button for time index.
   * Reset previous visible button states.
   *
   * @param {Number} index Time index 1-N
   * @public
   */
  setVisibleButtonForTime(index) {
    const element = this.component.querySelector(`[${this.selectors.index}="${index}"]`);

    this.setVisibleButton(element);
  }

  /**
   * Set visible button.
   * Reset previous visible button states.
   *
   * @param {Object} currentButton HTML element
   * @public
   */
  setVisibleButton(currentButton) {
    const allButtons = this.component.querySelectorAll(`[${this.selectors.control}]`);
    const { selectors } = this;

    allButtons.forEach((button) => {
      button.classList.remove(selectors.active);
    });

    currentButton.classList.add(selectors.active);
  }

  /**
   * Create buttons from existing HTML markup.
   *
   * @private
   */
  createButtons() {
    const buttonCount = this.viewApiDataHelper.getTotalExampleFormCount();
    const button = this.component.querySelector(`[${this.selectors.control}]`);

    this.domGenerateLib.cloneElementOften(buttonCount - 1, button);
  }

  /**
   * Get elements time index from attribute.
   *
   * @return {Number}
   * @private
   */
  getTimeIndex(element) {
    return +element.getAttribute(this.selectors.index);
  }

  /**
   * Update buttons with content from API.
   *
   * @private
   */
  updateButtons() {
    const buttons = this.component.querySelectorAll(`[${this.selectors.control}]`);

    buttons.forEach(this.modifyButton.bind(this));
  }

  /**
   * Set button text, CSS style and numeric identifier (for event use).
   * Mark first button as active by default.
   *
   * 1) Arbitrary value, change as needed
   *    - 9%   => Fix mobile viewport overlapping buttons
   *    - 8.2% => 13 items max.
   *
   * @private
   */
  modifyButton(button, index) {
    /* eslint-disable no-param-reassign */

    const { selectors } = this;
    const indexFromOne = index + 1;
    const isTimeless = this.viewApiDataHelper.getExampleIndexIsTimeless(index);
    const selectedItems = this.stateView.getActiveItems();
    const isSelected = selectedItems.includes(indexFromOne);

    button.title = this.viewApiDataHelper.getExampleTimespanText(index);
    button.textContent = indexFromOne;
    button.style.left = `${index * 9}%`; // *1

    button.setAttribute(selectors.index, indexFromOne);

    // Reset

    button.classList.remove(selectors.selected);
    button.classList.remove(selectors.timeless);

    // Re-apply current

    if (isSelected) {
      button.classList.add(selectors.selected);
    }

    if (isTimeless) {
      button.classList.add(selectors.timeless);
    }
  }
}
