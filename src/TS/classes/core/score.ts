import Api from '../core/api';

import PubSub from '../../lib/pubsub';
import Singleton from '../../lib/singleton';

import { PubSubEvents } from '../../types/pubsub-events';

/**
 * Game/Player score management.
 *
 * - Constructor
 * - Set/Get
 * - Events
 *   - Bind
 *   - Listeners
 *
 * @todo  Decouple abstract score from UI form class (and API data?).
 */
export default class Score extends Singleton {
  /**
   * Types of event bindings.
   */
  private readonly events: PubSubEvents = {
    subscribe: {
      appIsReady: 'App:isReady', // Boolean
      formIsValidated: 'UiForm:isValidated', // Quiz data
    },
  };

  /**
   * Game/Player scores.
   *
   * @todo  Calculate max. score dynamically from API data.
   * @todo  Improve type annotations.
   */
  private score: any = {
    percent: 0, // 0-100
    current: 0, // 0-N
    max: 0, // 0-N
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
    super(Score);

    this.api = Api.getInstance(Api);
    this.pubSub = PubSub.getInstance(PubSub);

    this.bindEvents();
  }

  // ----------------------------------------------------------------------------------------------------------- Set/Get
  // ------------------------------------------------------------------------------------------------- Getter

  /**
   * Update + Get all scores.
   */
  public getAllScores(): any {
    this.setPercentageScore();

    return this.score;
  }

  /**
   * Get percentage of current/last achieved score.
   */
  public getPercentageScore(): number {
    const score = this.score;
    const percent = (score.current * 100) / score.max;

    return percent;
  }

  /**
   * Get current/last achieved score.
   */
  public getCurrentScore(): number {
    return this.score.current;
  }

  /**
   * Get maximum achievable score.
   */
  public getMaxScore(): number {
    return this.score.current;
  }

  // -------------------------------------------------------------------------------------------------- Setter

  /**
   * Set percentage score.
   */
  private setPercentageScore(): void {
    const score = this.score;
    const percent = (score.current * 100) / score.max;

    score.percent = percent;
  }

  /**
   * Set maximum score from API data.
   */
  private setMaxScoreFromApiData(): Score {
    const apiData = this.api.getStoredData('quiz').questions;
    let points = 0;

    apiData.forEach((item, index, all) => {
      points += item.points;
    });

    this.score.max = points;

    return this;
  }

  // ------------------------------------------------------------------------------------------------------------ Events
  // ---------------------------------------------------------------------------------------------------- Bind

  /**
   * Bind events.
   */
  private bindEvents(): Score {
    this.pubSub.subscribe(this.events.subscribe.appIsReady, this.onAppIsReady.bind(this), true);

    this.pubSub.subscribe(this.events.subscribe.formIsValidated, this.onFormIsValidated.bind(this));

    return this;
  }

  // ----------------------------------------------------------------------------------------------- Listeners

  /**
   * Event listener callback when application is ready.
   * Set score from API data that has been fetched by now.
   */
  private onAppIsReady(event: any): void {
    this.setMaxScoreFromApiData();
  }

  /**
   * Callback if a form has been validated.
   */
  private onFormIsValidated(event: any): void {
    const data = event.detail;
    const points = data.apiData.points;
    const isValid = data.isValid;

    if (isValid) {
      this.score.current += points;
    }
  }
}
