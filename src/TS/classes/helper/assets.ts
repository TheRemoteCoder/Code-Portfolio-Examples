import Api from '../core/api';

import PubSub from '../../lib/pubsub';
import Singleton from '../../lib/singleton';

import { PubSubEvents } from '../../types/pubsub-events';

/**
 * Asset helper to preload binary media files.
 *
 * - Constructor
 * - File loader
 * - Events
 *   - Listeners
 */
export default class HelperAssets extends Singleton {
  /**
   * Types of event bindings.
   */
  private readonly events: PubSubEvents = {
    subscribe: {
      appIsReady: 'App:isReady', // Boolean
    },
  };

  /** API class instance */
  private api: Api;

  /** PubSub class instance */
  private pubSub: PubSub;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set Singleton state.
   */
  constructor() {
    super(HelperAssets);

    this.api = Api.getInstance(Api);
    this.pubSub = PubSub.getInstance(PubSub);

    this.bindEvents();
  }

  // ------------------------------------------------------------------------------------------------------- File loader

  /**
   * Preload images from API data.
   */
  public preloadApiImages(): void {
    const api = this.api;
    const apiDataQuiz = api.getStoredData('quiz').questions;
    const apiDataResult = api.getStoredData('result').results;
    const apiData = [...apiDataQuiz, ...apiDataResult]; // Merge
    const images = [];

    apiData.forEach((data, index, parent) => {
      images[index] = new Image();
      images[index].src = data.img;
    });
  }

  // ------------------------------------------------------------------------------------------------------------ Events

  /**
   * Bind events.
   */
  private bindEvents(): void {
    this.pubSub.subscribe(this.events.subscribe.appIsReady, this.onAppIsReady.bind(this), true);
  }

  // ----------------------------------------------------------------------------------------------- Listeners

  /**
   * Event listener callback when application is ready.
   * Create and activate screens and inject HTML.
   */
  private onAppIsReady(event: any): void {
    this.preloadApiImages();
  }
}
