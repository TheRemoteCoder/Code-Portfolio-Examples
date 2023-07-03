// Views
import AbstractView from '../abstract';
import RenderDocumentsView from './render';

/**
 * Document links.
 */
export default class DocumentsView extends AbstractView {
  /**
   * Constructor initializes component.
   */
  constructor() {
    super();

    this.renderView = new RenderDocumentsView(this);
  }

  /**
   * Component connected callback:
   * Render component markup.
   *
   * @private
   */
  connectedCallback() {
    this.renderView.render();
  }

  /**
   * Component tag for instanciation.
   *
   * @return {String}
   * @public
   */
  static getTagName() {
    return 'component-x-documents';
  }
}
