import IUiScreen from '../../../interfaces/ui/screen';

import Singleton from '../../../lib/singleton';

import Api from '../../core/api';
import Score from '../../core/score';

/**
 * Screen type: Result.
 * Event + state management and UI element composite.
 *
 * - Constructor
 * - HTML
 * - Events
 * - Render
 *   - Screens
 *
 * @todo  Find better way to handle DOM changes (less selector mess and spread in JS?).
 */
export default class UiScreenResult extends Singleton implements IUiScreen {
  /**
   * Generated HTML DocumentFragment object.
   */
  private domHtml: object;

  /** API class instance */
  private api: Api;

  /** Score class instance */
  private score: Score;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set Singleton state, instanciate dependencies and create HTML.
   */
  constructor() {
    super(UiScreenResult);

    this.api = Api.getInstance(Api);
    this.score = Score.getInstance(Score);

    this.createHtml();
  }

  // -------------------------------------------------------------------------------------------------------------- HTML

  /**
   * Return generated HTML DocumentFragment object.
   */
  public getHtml(): object {
    return this.domHtml;
  }

  // ------------------------------------------------------------------------------------------------------------ Render
  // ------------------------------------------------------------------------------------------------- Screens

  /**
   * Enrich HTML with API data and
   * animate score text.
   *
   * @todo  Outsource animation.
   */
  private createHtml(): UiScreenResult {
    const scores = this.score.getAllScores();
    const apiScoreData = this.api.getApiResultDataForScore(scores);

    // Score
    const scorePercent = scores.percent;
    const scoreCurrent = scores.current;
    const scoreMax = scores.max;

    // Data
    const imgSrc = apiScoreData.img;
    const title = apiScoreData.title;
    const description = apiScoreData.message;

    // Elements
    const elImage = document.querySelector('.js-screen-result__img');
    const elTitle = document.querySelector('.js-screen-result__title');
    const elScorePercent = document.querySelector('.js-screen-result__score-percent');
    const elScorePoints = document.querySelector('.js-screen-result__score-points');
    const elDescription = document.querySelector('.js-screen-result__score-description');

    // Modify content
    elImage.setAttribute('src', imgSrc);

    elScorePercent.innerHTML = '0 %'; // Will be animated
    elScorePoints.innerHTML = `${scoreCurrent} / ${scoreMax}`;
    elTitle.innerHTML = title;
    elDescription.innerHTML = description;

    this.animateScore(elScorePercent, scorePercent);

    return this;
  }

  /**
   * Animate score text.
   *
   * Note: The speed in Milliseconds must match the CSS class animation.
   */
  private animateScore(element: any, score: number): void {
    const speedMs = 25;
    let i = 0;

    function animate() {
      if (i < score) {
        i += 1;

        element.classList.toggle('--is-animating');
        element.innerHTML = `${i} %`;

        setTimeout(animate, speedMs);
      } else {
        element.classList.remove('--is-animating');
      }
    }

    animate();
  }
}
