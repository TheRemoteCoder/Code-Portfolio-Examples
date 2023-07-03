// Libraries
import DomTextLib from '../../lib/dom/text';
import EventLib from '../../lib/event';

// Views
import AbstractView from '../abstract';
import StateModalIntroView from './state';

/**
 * Text modal.
 */
export default class ModalIntroView extends AbstractView {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    super();

    const apiData = super.getApiData();

    this.domTextLib = new DomTextLib(this, apiData.texts);
    this.eventLib = new EventLib();
    this.stateView = new StateModalIntroView();

    this.config = {
      id: 'intro',
    };

    this.selectors = {
      body: 'modal-open',
    };

    this.events = {
      publish: {
        showDefault: 'modalIntro.showDefault',
      },
      subscribe: {
        appReady: 'controllerCore.ready',
        modalHide: 'coreModal.hide',
      },
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
    const { eventLib } = this;
    const { events } = this;

    eventLib.subscribe(events.subscribe.appReady, this.onAppReady.bind(this));
    eventLib.subscribe(events.subscribe.modalHide, this.onModalHide.bind(this));
  }

  /**
   * Show default modal once application is ready.
   *
   * @private
   */
  onAppReady() {
    this.showDefault();
  }

  /**
   * On modal hide, update state.
   *
   * @private
   */
  onModalHide(/* event */) {
    this.stateView.setHasBeenOpened();
  }

  /**
   * Update text from API data, if available.
   *
   * @private
   */
  updateText() {
    const { domTextLib } = this;

    domTextLib.setHtmlForKey('text');
  }

  /**
   * Show default modal once by default, update body class and state.
   * Reloading the application won't show it automatically again.
   *
   * @private
   */
  showDefault() {
    const hasAlreadyBeenOpened = !!this.stateView.hasAlreadyBeenOpened();

    if (hasAlreadyBeenOpened) {
      return;
    }

    this.setOpenModalClass();

    this.eventLib.publish(this.events.publish.showDefault, {
      name: this.config.id,
    });
  }

  /**
   * Set body class for opened modal.
   *
   * @private
   */
  setOpenModalClass() {
    document.querySelector('body').classList.add(this.selectors.body);
  }

  /**
   * Component tag for instanciation.
   *
   * @return {String}
   * @public
   */
  static getTagName() {
    return 'component-x-modal-intro';
  }
}
