import IUiScreen from '../../../interfaces/ui/screen';

import PubSub from '../../../lib/pubsub';

import { PubSubEvents } from '../../../types/pubsub-events';

import HelperDom from '../../helper/dom';

import UiForm from '../../ui/form';

/**
 * Screen type: Quiz.
 * Event + state management and UI element composite.
 *
 * - Constructor
 * - HTML
 * - Events
 * - Render
 *   - Screens
 * - Animations
 *
 * @todo  Fix: See PubSub class - Binding events to global window object breaks with instances!
 * @todo  Fix: Implement unbind/unload/destroy to prevent functional interference issues and free memory.
 * @todo  Find better way to handle DOM changes (less selector mess and spread in JS?).
 */
export default class UiScreenQuiz implements IUiScreen {
  /**
   * Types of event bindings.
   */
  private readonly events: PubSubEvents = {
    publish: {
      onCreate: 'IUiScreen:onCreate', // 0 | Void
      onUpdate: 'IUiScreen:onUpdate', // 1 | Void
      onFinish: 'IUiScreen:onFinish', // 2 | Void
      onDestroy: 'IUiScreen:onDestroy', // 3 | Void

      isReady: 'IUiScreen:isReady', // 0 | Boolean
      isUpdated: 'IUiScreen:isUpdated', // 1 | Boolean
      isFinished: 'IUiScreen:isFinished', // 2 | Boolean
      isDestroyed: 'IUiScreen:isDestroyed', // 3 | Boolean
    },
    subscribe: {
      formIsFinished: 'UiForm:isFinished', // Number  (Index)
    },
  };

  /**
   * DOM element selectors.
   */
  private readonly domSelectors: any = {
    template: '#js-screen-quiz__template',
  };

  /**
   * API data specific for this screen.
   */
  private apiData: any;

  /**
   * Numeric screen index as ID and sort order.
   */
  private index: number;

  /**
   * Total amount of available screens.
   */
  private total: number;

  /**
   * Generated HTML DocumentFragment object.
   */
  private domHtml: object;

  /**
   * CSS selector of loading bar (animation) for this screen.
   */
  private loadingBarCssId: '';

  /** DOM Helper class instance */
  private helperDom: HelperDom;

  /** PubSub class instance */
  private pubSub: PubSub;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set stored + prepared API data for current screen;
   * instanciate dependencies, create HTML and bind events.
   */
  constructor(apiData: any, index: number = 1, total: number) {
    this.apiData = apiData;
    this.index = index;
    this.total = total;

    this.helperDom = HelperDom.getInstance(HelperDom);
    this.pubSub = PubSub.getInstance(PubSub);

    this.createHtml().bindEvents();
  }

  // -------------------------------------------------------------------------------------------------------------- HTML

  /**
   * Return generated HTML DocumentFragment object.
   */
  public getHtml(): object {
    return this.domHtml;
  }

  // ------------------------------------------------------------------------------------------------------------ Events

  /**
   * Bind events.
   *
   * @todo  Final event should fire only once (see top class comment).
   */
  private bindEvents(): UiScreenQuiz {
    this.pubSub.subscribe(this.events.subscribe.formIsFinished, this.onFormIsFinished.bind(this));

    return this;
  }

  // ----------------------------------------------------------------------------------------------- Listeners

  /**
   * Callback if a form is finished (after validation).
   *
   * - Animate loading bar for next screen.
   * - Run class self destruction.
   */
  private onFormIsFinished(event: any): void {
    const formIndex = event.detail.index;

    if (this.isCurrentScreenAndFormIndex(formIndex)) {
      this.animateLoadingBar();
    }

    this.destroySelf();
  }

  /**
   * Destroy after class is not used any more:
   * - Unbind all event listeners.
   * - Delete unneeded objects.
   */
  private destroySelf() {}

  // ------------------------------------------------------------------------------------------------------- Class state

  /**
   * Workaround/Fix for multiple class instances: Check if current screen and form element are the same.
   * Events trigger all quiz screens at once as there is no unloading yet!
   *
   * @todo  Replace workaround by proper technique.
   */
  private isCurrentScreenAndFormIndex(formIndex: number): boolean {
    const isEqual = this.index === formIndex;

    return isEqual;
  }

  // ------------------------------------------------------------------------------------------------------------ Render
  // ------------------------------------------------------------------------------------------------- Screens

  /**
   * Enrich HTML with API data.
   */
  private createHtml(): UiScreenQuiz {
    const apiData = this.apiData;
    const index = this.index;
    const total = this.total;
    const uiForm = new UiForm(apiData, index);

    // Data
    const id = index; // apiData.q_id;
    const imgSrc = apiData.img;
    const title = apiData.title;
    const formHtml = uiForm.getHtml();

    // Elements
    const template = document.querySelector(this.domSelectors.template);
    const templateClone = document.importNode(template.content, true);

    const elContainer = templateClone.getElementById('js-screen-quiz');
    const elForm = templateClone.getElementById('app-example-quiz__form');
    const elSubmit = templateClone.getElementById('js-screen-quiz__form-submit');
    const elImage = templateClone.querySelector('.js-screen-quiz__img');
    const elTitle = templateClone.querySelector('.js-screen-quiz__title');
    const loadingBar = templateClone.querySelector('.js-screen-quiz__loading-bar');

    // Modify content
    loadingBar.id = `js-screen-quiz__loading-bar-${id}`;
    elContainer.id = `js-screen-quiz-${id}`;
    elSubmit.id = `js-screen-quiz__form-submit-${id}`;
    elTitle.textContent = `${index}/${total}: ${title}`;

    elForm.id = `app-example-quiz__form-${id}`;
    elForm.setAttribute('name', elForm.id);
    elSubmit.setAttribute('form', elForm.id);

    elForm.appendChild(formHtml);
    elImage.setAttribute('src', imgSrc);

    this.loadingBarCssId = loadingBar.id;
    this.domHtml = templateClone;

    return this;
  }

  // -------------------------------------------------------------------------------------------------------- Animations

  /**
   * Animate loading bar to indicate user the
   * waiting duration till the next screen starts.
   */
  private animateLoadingBar() {
    const id = this.loadingBarCssId;

    this.helperDom.addClass('--is-changing-screen', `#${id}`);
  }
}
