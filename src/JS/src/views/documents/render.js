// Views
import AbstractRenderView from '../abstract-render';

/**
 * Render document links from template.
 */
export default class RenderDocumentsView extends AbstractRenderView {
  /**
   * Constructor sets dependencies.
   *
   * @param {Object} component Component element reference from parent class as 'this' scope
   */
  constructor(component) {
    super();

    this.component = component;

    this.selectors = {
      template: 'template-x-documents',
    };
  }

  /**
   * Render component data from template.
   *
   * 1) The cloned templates ID must be removed before using it.
   * Without, any further clone would copy from the new duplicate ID.
   * Also remove the class to unhide the element.
   *
   * @public
   */
  render() {
    const template = document.getElementById(this.selectors.template);
    const clone = template.cloneNode(true);

    clone.removeAttribute('id'); // 1
    clone.removeAttribute('class');

    this.component.insertAdjacentElement('beforeend', clone);
  }
}
