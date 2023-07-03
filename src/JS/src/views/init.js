// Views
import AbstractView from './abstract';
import DocumentsView from './documents/index';
import FormAnalyzeView from './form-analyze/index';
import ModalIntroView from './modal-intro/index';
import TimeNavigationView from './time-navigation/index';

/**
 * Initialize view components.
 * Handles full page UI.
 */
export default class InitView {
  /**
   * Constructor sets dependencies.
   *
   * @param {Object} pageModel Class instance
   */
  constructor(pageModel) {
    this.pageModel = pageModel;
    this.win = window;

    this.abstractView = AbstractView;
    this.components = [DocumentsView, FormAnalyzeView, ModalIntroView, TimeNavigationView];

    this.init();
  }

  /**
   * Initialize view components.
   *
   * @public
   */
  init() {
    this.supplyComponentData();
    this.defineComponents();
  }

  /**
   * Supply components with API data.
   *
   * @private
   */
  supplyComponentData() {
    const apiData = this.pageModel.data;
    const { props } = this.pageModel;

    this.abstractView.setData(apiData);
    this.abstractView.setProps(props);
  }

  /**
   * Define components as valid elements - HTML 5 API requirement.
   * This will auto-instanciate all referenced classes.
   *
   * @private
   */
  defineComponents() {
    const components = Object.entries(this.components);

    for (const [, component] of components) {
      this.win.customElements.define(component.getTagName(), component);
    }
  }
}
