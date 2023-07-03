import PubSub from '../lib/pubsub';

import { PubSubEvents } from '../types/pubsub-events';

import Api from './core/api';
import Score from './core/score';

import HelperAssets from './helper/assets';

import UiScreenPreloader from './ui/screen/preloader';
import UiStage from './ui/stage';

/**
 * Main application entry point.
 * Initialises and orchestrates all application classes.
 *
 * - Constructor
 * - Init
 * - Run
 * - Events
 */
export default class App {
  /**
   * Types of event bindings.
   */
  private readonly events: PubSubEvents = {
    publish: {
      isReady: 'App:isReady', // Boolean
    },
  };

  /**
   *  Delay for preloader fade-out animation:
   * See '.o-fullsize-background' CSS class.
   */
  private preloaderFadeOutMs: number = 250;

  /** @type {Window} */
  private win: any;

  /** API class instance */
  private api: Api;

  /** Preloader screen class instance */
  private uiScreenPreloader: UiScreenPreloader;

  /** PubSub class instance */
  private pubSub: PubSub;

  /** Score class instance */
  private score: Score;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Application constructor.
   *
   * - Pass DOM window reference
   * - Instanciate/Initialise classes
   * - Binds events
   */
  constructor(win: any) {
    this.win = win;

    this.api = Api.getInstance(Api);
    this.uiScreenPreloader = UiScreenPreloader.getInstance(UiScreenPreloader);
    this.pubSub = PubSub.getInstance(PubSub);
    this.score = Score.getInstance(Score);

    HelperAssets.getInstance(HelperAssets);
    UiStage.getInstance(UiStage);

    this.init();
  }

  // -------------------------------------------------------------------------------------------------------------- Init

  /**
   * Initialise application.
   *
   * - Get data from API
   * - Wait for DOM ready status
   * - Trigger + Hide preloader
   * - Trigger application ready state
   */
  private init(): void {
    const promises = [this.api.initAsync(), this.domReady()];

    const promisesData = Promise.all(promises);
    const promisePreloader = promisesData
      .then(() => {
        return this.uiScreenPreloader.initAsync();
      })
      .catch((err) => {
        throw Error(err);
      });

    // - Remove preloader once finished
    // - Start the actual game
    promisePreloader.then(() => {
      this.uiScreenPreloader.removeSelf();

      setTimeout(this.run.bind(this), this.preloaderFadeOutMs);
    });
  }

  // --------------------------------------------------------------------------------------------------------------- Run

  /**
   * Publish state that application is ready to run.
   * This is the main event communicated to all other classes.
   */
  private run(): void {
    this.pubSub.publish(this.events.publish.isReady);
  }

  // ------------------------------------------------------------------------------------------------------------ Events

  /**
   * DOM ready resolver.
   */
  private domReady(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.win.addEventListener('load', () => {
        resolve(true);
      });
    });
  }
}
