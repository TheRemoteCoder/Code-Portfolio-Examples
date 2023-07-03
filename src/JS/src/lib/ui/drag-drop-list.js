// Libraries
import SanitizerLib from '../sanitizer';

/**
 * List element text drag & drop for use with form elements.
 */
export default class UiDragDropListLib {
  /**
   * Constructor sets properties.
   *
   * @param {String} selectorContainer Container to hold events (HTML element selector)
   */
  constructor(selectorContainer, arrowSymbol) {
    this.win = window;
    this.sanitizerLib = new SanitizerLib();

    this.selectorContainer = selectorContainer;
    this.arrowSymbol = arrowSymbol;
  }

  /**
   * Bind events to elements or quit if none are found.
   *
   * @public
   */
  bindEvents() {
    const containers = this.getContainerElements();

    containers.forEach((container) => {
      container.addEventListener('dragstart', this.onDragStart.bind(this));
    });
  }

  /**
   * Set text on drag start that will be the result on drop.
   *
   * @param {Object} event
   * @private
   */
  onDragStart(event) {
    const text = this.sanitizerLib.sanitize(event.target.textContent);

    event.dataTransfer.setData('text/plain', text);
  }

  /**
   * Get elements for given container selector.
   *
   * @private
   * @return {Object}
   */
  getContainerElements() {
    const elements = document.querySelectorAll(this.selectorContainer);

    if (!elements.length) {
      throw new Error(`No elements found for selector ${this.selectorContainer}`);
    }

    return elements;
  }
}
