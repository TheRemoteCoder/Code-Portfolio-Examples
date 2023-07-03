// Libraries
import DomTextLib from '../../lib/dom/text';

// Models
import ExampleModel from '../../models/example';

// Views
import AbstractView from '../abstract';
import RenderFormAnalyzeView from './render';

/**
 * Analyze form UI with user data and submit buttons.
 */
export default class FormAnalyzeView extends AbstractView {
  /**
   * Constructor sets dependencies and initializes component.
   */
  constructor() {
    super();

    const apiData = super.getApiData();

    this.domTextLib = new DomTextLib(this, apiData.texts);
    this.renderView = new RenderFormAnalyzeView(this);
    this.exampleModel = new ExampleModel();

    this.selectors = {
      formName: 'x-form-analyze',
      formContainer: '#x-form-analyze',
    };

    this.init();
  }

  /**
   * Initialize component.
   *
   * @private
   */
  init() {
    this.updateText();
    this.bindEvents();
  }

  /**
   * Bind events.
   *
   * @private
   */
  bindEvents() {
    const form = this.querySelector(this.selectors.formContainer);

    form.addEventListener('submit', this.onFormSubmit.bind(this));
  }

  /**
   * Update text from API data.
   *
   * @private
   */
  updateText() {
    const { domTextLib } = this;

    domTextLib.setHtmlForKey('example');
  }

  /**
   * Form submit callback:
   * Send all form data to server for quality check + save.
   *
   * @param {Object} event
   */
  onFormSubmit(event) {
    const { exampleModel } = this;
    const isValidForm = exampleModel.isValidForm();

    event.preventDefault();

    if (!isValidForm) {
      return;
    }

    const formData = this.getFormData();

    exampleModel.checkAndSave(formData);

    this.renderView.toggleButtonAnimation();
  }

  /**
   * Get form data containing all elements on the page;
   * given they match the required selector.
   *
   * @return {Object} FormData data
   * @private
   */
  getFormData() {
    const form = document.getElementById(this.selectors.formName);

    return new FormData(form);
  }

  /**
   * Component tag for instanciation.
   *
   * @return {String}
   * @public
   */
  static getTagName() {
    return 'component-x-form-analyze';
  }
}
