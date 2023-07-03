// Libraries
import EventLib from '../../lib/event';

/**
 * Interactive modals via 'Bootstrap'.
 */
export default class UiModalCore {
  /**
   * Constructor sets dependencies.
   *
   * @param {Object} bootstrapRef Bootstrap module reference
   */
  constructor(bootstrapRef) {
    this.modalRef = bootstrapRef.Modal;

    this.eventLib = new EventLib();

    this.events = {
      publish: {
        hide: 'coreModal.hide',
      },
      subscribe: {
        navigationChange: 'coreNavigation.change',
        showDefault: 'modalIntro.showDefault',
      },
    };

    this.selectors = {
      all: '[data-x-modal]',
      custom: 'data-x-modal',
    };
  }

  /**
   * Create modals.
   *
   * @public
   */
  init() {
    this.create();
    this.bindEvents();
  }

  /**
   * Bind events.
   *
   * @private
   */
  bindEvents() {
    const { eventLib } = this;
    const subscribeEvents = this.events.subscribe;
    const modals = document.querySelectorAll(this.selectors.all);

    modals.forEach((modal) => {
      modal.addEventListener('hidden.bs.modal', this.onHide.bind(this));
    });

    eventLib.subscribe(subscribeEvents.navigationChange, this.onNavigationChange.bind(this));
    eventLib.subscribe(subscribeEvents.showDefault, this.onShowDefault.bind(this));
  }

  /**
   * On modal hide, publish intended 'public' event.
   * The Bootstrap-native event is intended 'private' to this module.
   *
   * @private
   */
  onHide(/* event */) {
    this.eventLib.publish(this.events.publish.hide);
  }

  /**
   * Hide all modals (reset) and show the currently given, if any.
   *
   * Navigation change event callback - Only listen to events of own module concern;
   * but always hide any open modal to prevent any feature collisions.
   *
   * @param {Object} event
   */
  onNavigationChange(event) {
    const { action, module } = event.detail.data;
    const isOwnEvent = module === 'modal';

    this.hide();

    if (!isOwnEvent) {
      return;
    }

    this.show(action);
  }

  /**
   * Show default modal defined by component.
   *
   * @param {Object} event
   * @private
   */
  onShowDefault(event) {
    const { name } = event.detail.data;

    this.show(name);
  }

  /**
   * Create modals.
   *
   * @private
   */
  create() {
    const modals = document.querySelectorAll(this.selectors.all);

    modals.forEach((modal) => {
      // eslint-disable-next-line no-new
      new this.modalRef(modal);
    });
  }

  /**
   * Show default modal, if exists.
   *
   * @private
   */
  showDefault() {
    const defaultModal = this.config.default;

    if (!defaultModal) {
      return;
    }

    this.show(defaultModal);
  }

  /**
   * Show modal.
   *
   * @param {String} identifier Modal name
   * @private
   */
  show(identifier) {
    const modal = document.querySelector(`[${this.selectors.custom}="${identifier}"]`);
    const modalInstance = this.modalRef.getInstance(modal);

    modalInstance.show();
  }

  /**
   * Hide all (open) modals.
   *
   * @private
   */
  hide() {
    const modals = document.querySelectorAll(this.selectors.all);

    modals.forEach((modal) => {
      const modalInstance = this.modalRef.getInstance(modal);

      modalInstance.hide();
    });
  }
}
