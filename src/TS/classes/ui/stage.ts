import PubSub from '../../lib/pubsub';
import Singleton from '../../lib/singleton';

import { PubSubEvents } from '../../types/pubsub-events';

import Api from '../core/api';
import Config from '../core/config';

import HelperDom from '../helper/dom';
import HelperMath from '../helper/math';

import UiScreenQuiz from './screen/quiz';
import UiScreenResult from './screen/result';

/**
 * Stage as central element collection orchestration.
 * Creates and maintains screens.
 *
 * - Constructor
 * - Events
 *   - Publish
 *   - Listeners
 * - DOM
 *
 * @todo  Optimise memory use: Unbind events and delete elements of previous screens (+ for all dependant classes).
 */
export default class UiStage extends Singleton {
  /**
   * Types of event bindings.
   */
  private readonly events: PubSubEvents = {
    publish: {
      hasChangedScreen: 'UiStage:hasChangedScreen', // Object  (screenStates)
      isFirstScreen: 'UiStage:isFirstScreen', // Boolean (true)
      isLastScreen: 'UiStage:isLastScreen', // Boolean (true)
      stageIsReady: 'UiStage:stageIsReady', // Boolean (true)
    },
    subscribe: {
      appIsReady: 'App:isReady', // Boolean
      formIsValidated: 'UiForm:isValidated', // Quiz data
      stageIsLastScreen: 'UiStage:isLastScreen', // Boolean (true)
    },
  };

  /**
   * Screen states (automatically applied).
   * Note: The Intro/Preloader is not included here.
   */
  private screenStates: any = {
    total: 0,
    current: 0,
    isFirst: true,
    isLast: false,
  };

  /**
   * DOM element selectors.
   */
  private readonly domSelectors: any = {
    containerId: 'js-app-example__stage',
  };

  /**
   * Document fragment for all generated HTML.
   */
  private docFragment: DocumentFragment;

  /**
   * Screen class instances.
   */
  private screens: any = [];

  /** API class instance */
  private api: Api;

  /** DOM Helper class instance. */
  private helperDom: HelperDom;

  /** HelperMath class instance */
  private helperMath: HelperMath;

  /** PubSub class instance */
  private pubSub: PubSub;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set Singleton state, instanciate dependencies and bind events.
   */
  constructor() {
    super(UiStage);

    this.api = Api.getInstance(Api);
    this.pubSub = PubSub.getInstance(PubSub);
    this.helperDom = HelperDom.getInstance(HelperDom);
    this.helperMath = HelperMath.getInstance(HelperMath);

    this.docFragment = document.createDocumentFragment();

    this.bindEvents();
  }

  // ------------------------------------------------------------------------------------------------------------ Events

  /**
   * Bind events.
   */
  private bindEvents(): void {
    this.pubSub.subscribe(this.events.subscribe.appIsReady, this.onAppIsReady.bind(this), true);

    this.pubSub.subscribe(this.events.subscribe.formIsValidated, this.onFormIsValidated.bind(this));

    this.pubSub.subscribe(this.events.subscribe.stageIsLastScreen, this.onScreenIsLast.bind(this), true);
  }

  // ------------------------------------------------------------------------------------------------- Publish

  /**
   * Broadcast current screen state.
   * Call this method only if the state has changed.
   */
  private publishScreenChangedState(): void {
    const pubSub = this.pubSub;
    const events = this.events.publish;
    const state = this.screenStates;

    pubSub.publish(events.hasChangedScreen, state);

    if (state.isFirst) {
      pubSub.publish(events.isFirstScreen, true);
    } else if (state.isLast) {
      pubSub.publish(events.isLastScreen, true);
    }
  }

  // ----------------------------------------------------------------------------------------------- Listeners

  /**
   * Event listener callback when application is ready.
   * Create and activate screens and inject HTML.
   */
  private onAppIsReady(event: any): void {
    this.setInitialScreenState().createQuizScreens().renderHtml().setActiveScreen(1);

    this.pubSub.publish(this.events.publish.stageIsReady);
  }

  /**
   * Callback if a form has been validated:
   * Set next screen to display.
   */
  private onFormIsValidated(event: any): void {
    this.setNextScreen();
  }

  /**
   * Callback if last screen has been reached.
   */
  private onScreenIsLast(event: any): void {
    this.createResultScreen();
  }

  // --------------------------------------------------------------------------------------------------------------- DOM

  /**
   * Create quiz question screens.
   */
  private createQuizScreens(): UiStage {
    const hasRandomScreens = Config.get('randomizeQuizScreenOrder');

    const api = this.api;
    const screens = this.screens;
    let dataQuiz = api.getStoredData('quiz').questions;

    if (hasRandomScreens) {
      dataQuiz = this.helperMath.shuffleArray(dataQuiz);
    }

    dataQuiz.forEach((value, index, data) => {
      screens.push(new UiScreenQuiz(value, index + 1, dataQuiz.length));
    });

    return this;
  }

  /**
   * Create result screen.
   * This can be done only after the score result is clear.
   */
  private createResultScreen(): void {
    // HTML is generated inside
    const screen = new UiScreenResult();
  }

  /**
   * Inject HTML into application container.
   */
  private renderHtml(): UiStage {
    const containerId = this.domSelectors.containerId;
    const fragment = this.docFragment;

    this.screens.forEach((screen, index, arr) => {
      const node = screen.getHtml();

      fragment.appendChild(node);
    });

    document.getElementById(containerId).appendChild(fragment);

    return this;
  }

  // ------------------------------------------------------------------------------------------------------------ States

  /**
   * Set active screen + its new state by number or keep if it's last.
   * Render HTML and publish new state.
   */
  private setActiveScreen(screenNumber: number): UiStage {
    const state = this.screenStates;

    // Reset before re-applying
    state.isFirst = false;
    state.isLast = false;

    if (this.isLastScreen(screenNumber)) {
      state.isLast = true;
    } else if (screenNumber >= 0) {
      state.current = screenNumber;
    } else {
      // <= 0
      state.isFirst = true;
      state.current = 0;
    }

    this.setActiveScreenHtml();
    this.publishScreenChangedState();

    return this;
  }

  /**
   * Set next screen state or keep the current if it's already the last.
   * Render HTML and publish new state.
   */
  private setNextScreen(): void {
    const state = this.screenStates;
    let current = state.current;

    if (!state.isLast) {
      current += 1;
      state.current = current;
    }

    if (this.isLastScreen(current)) {
      state.isLast = true;
    }

    this.setActiveScreenHtml();
    this.publishScreenChangedState();
  }

  /**
   * Set initial screen state: Define the max. number of screens.
   *
   * Screen count = Amount of questions + Result page
   * - The Intro/Preloader is excluded here.
   */
  private setInitialScreenState(): UiStage {
    const api = this.api;
    const state = this.screenStates;

    const questionCount = api.getStoredData('quiz').questions.length;
    const screenCount = questionCount + 1; // +1 = Result screen

    state.total = screenCount;

    return this;
  }

  /**
   * Set active screen HTML classes and remove old states.
   *
   * @todo  Find a better + more performant way without repaint/reflow impact.
   * @todo  Improve DOM element handling - Use of selectors, Consistent outsourcing, ...
   */
  private setActiveScreenHtml(): void {
    const helperDom = this.helperDom;
    const state = this.screenStates;

    const activeScreen = document.querySelector('.o-screen.--is-active');
    const introScreenId = document.getElementById('js-screen-intro').getAttribute('id');
    const resultScreenId = document.getElementById('js-screen-result').getAttribute('id');

    // 1. Hide current active screen
    if (activeScreen) {
      helperDom.toggleScreen(activeScreen.getAttribute('id'), false);
    }

    // 2. Set new active screen
    if (state.isFirst) {
      helperDom.toggleScreen(introScreenId, true);
    } else if (state.isLast) {
      helperDom.toggleScreen(resultScreenId, true);
    } else {
      helperDom.toggleScreen(`js-screen-quiz-${state.current}`, true);
    }

    // Debug mode: Show all screens at once for test purposes
    if (Config.get('debugShowAllScreens')) {
      const allScreens = document.querySelectorAll('.o-screen');

      allScreens.forEach((el) => {
        el.classList.add('--is-active');
      });
    }
  }

  // ------------------------------------------------------------------------------------------------- Checks

  /**
   * Check if current screen is the first.
   */
  private isFirstScreen(screenNumber: number): boolean {
    const isLast = screenNumber === 0;

    return isLast;
  }

  /**
   * Check if current screen is the last one.
   */
  private isLastScreen(screenNumber: number): boolean {
    const state = this.screenStates;
    const isLast = state.total === screenNumber;

    return isLast;
  }
}
