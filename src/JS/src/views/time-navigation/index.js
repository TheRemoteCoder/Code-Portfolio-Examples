// Models
import ExampleModel from '../../models/example';

// Views
import AbstractView from '../abstract';
import RenderTimeNavigationView from './render';
import StateTimeNavigationView from './state';

/**
 * Time index navigation.
 */
export default class TimeNavigationView extends AbstractView {
  /**
   * Constructor sets dependencies and initializes component.
   */
  constructor() {
    super();

    this.exampleModel = new ExampleModel();
    this.renderView = new RenderTimeNavigationView(this, super.getApiData(), this.viewApiDataHelper);
    this.stateView = new StateTimeNavigationView();

    this.events = {
      publish: {
        changed: 'timeNavigation.change',
      },
      subscribe: {
        formChange: 'form.change',
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
    this.setInitialState();
    this.bindEvents();
  }

  /**
   * Bind events.
   *
   * @private
   */
  bindEvents() {
    const { eventLib, events } = this;

    eventLib.subscribe(events.subscribe.formChange, this.onFormChange.bind(this));

    this.addEventListener('click', this.onTimeNavigationChanged);
  }

  /**
   * On form change; store filled form IDs and update button state visuals.
   *
   * @param {Object} _event
   */
  onFormChange(/* _event */) {
    const formFilledIds = this.exampleModel.getFilledFormIDs();

    this.stateView.setActiveItems(formFilledIds);
    this.renderView.updateButtons();
  }

  /**
   * Time navigation changed callback:
   * Set new state of current item, publish time change event
   * and update time navigation button state.
   *
   * @param {Object} event
   * @private
   */
  onTimeNavigationChanged(event) {
    const element = event.target;
    const isButton = element.type === 'button';

    if (isButton) {
      this.setNewState(element);
      this.triggerTimeChangeEvent(element);
      this.renderView.setVisibleButton(element);
    }
  }

  /**
   * Trigger event that current time index ID has changed.
   *
   * @param {Object} element HTML element
   * @private
   */
  triggerTimeChangeEvent(element) {
    const timeIndex = this.renderView.getTimeIndex(element);

    this.eventLib.publish(this.events.publish.changed, timeIndex);
  }

  /**
   * Set first index navigation state.
   *
   * @private
   */
  setFirstIndexState() {
    this.renderView.setVisibleButtonForTime(1);

    this.eventLib.publish(this.events.publish.changed, 1);
  }

  /**
   * Set initial active index navigation state.
   *
   * @private
   */
  setInitialState() {
    const index = this.stateView.getCurrentIndex();

    this.renderView.setVisibleButtonForTime(index);

    this.eventLib.publish(this.events.publish.changed, index);
  }

  /**
   * Set new index state from element.
   *
   * @param {Object} element HTML element
   * @private
   */
  setNewState(element) {
    const index = this.renderView.getTimeIndex(element);

    this.stateView.setCurrentIndex(index);
  }

  /**
   * Component tag for instanciation.
   *
   * @return {String}
   * @public
   */
  static getTagName() {
    return 'component-x-time-navigation';
  }
}
