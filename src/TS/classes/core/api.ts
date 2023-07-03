import { IGenericClassAsync } from '../../interfaces/generic-classes';

import Singleton from '../../lib/singleton';

import { ApiData } from '../../types/api-data';
import { ApiUrls } from '../../types/api-urls';

/**
 * JSON API request handling; data validation and preparation.
 *
 * - Constructor
 * - Init
 * - API data
 * - Request
 *   - Ajax
 *
 * @todo  Move specific public API data requests that process data to a separate class.
 * @todo  API class should also deliver metadata (e.g. question count).
 * @todo  Disclose and wrap instead of publishing the API attribute names.
 * @todo  Security optimisation: Sanitise/Validate/Trim requested API data.
 */
export default class Api extends Singleton implements IGenericClassAsync {
  /**
   * API request URLs.
   */
  private urls: ApiUrls = {
    quiz: 'https:/example.com/quiz.json',
    result: 'https:/example.com/result.json',
  };

  /**
   * Retrieved API data per URL.
   *
   * @todo  Fix type annotations. Issue: Unassigned var in class will be removed by Webpack/Typescript?
   */
  private data: ApiData | any = {
    quiz: {}, // ApiDataQuiz
    result: {}, // ApiDataResult
  };

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set Singleton state, instanciate dependencies.
   */
  protected constructor() {
    super(Api);
  }

  // -------------------------------------------------------------------------------------------------------------- Init

  /**
   * Initialise class - Request API data.
   */
  public initAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.requestApiData());
    });
  }

  // ---------------------------------------------------------------------------------------------------------- API data

  /**
   * Get stored API data.
   * Use when data already has been successfully requested previously.
   */
  public getStoredData(type: string): any | never {
    if (type in this.data) {
      return this.data[type];
    }

    throw Error(`Type ${type} does not exist in API data.`);
  }

  /**
   * Get answers for form validation as consistent numeric values.
   */
  public getNumericAnswersFromApiData(partialApiData: any): any {
    const apiAnswer = partialApiData.correct_answer; // Array | Boolean | Number
    const answers = [];

    if (Array.isArray(apiAnswer)) {
      apiAnswer.forEach((val, index, all) => {
        answers.push(+val);
      });
    } else if (typeof apiAnswer === 'number' || typeof apiAnswer === 'boolean') {
      answers.push(+apiAnswer);
    } else {
      throw Error('Unexpected type of apiData.correct_answer not of Array/Boolean/Number.');
    }

    return answers;
  }

  /**
   * Get API result data for current/last score.
   *
   * @todo  Naming conventions: API 'minpoints/maxpoints' are intended percentages?
   */
  public getApiResultDataForScore(scoreData: any): any | never {
    const resultData = this.getStoredData('result').results as object;
    const scorePercent = scoreData.percent;
    let apiResult = null;

    for (const [index, item] of Object.entries(resultData)) {
      const minPercent = item.minpoints;
      const maxPercent = item.maxpoints;

      if (scorePercent >= minPercent && scorePercent <= maxPercent) {
        apiResult = item;
        break;
      }
    }

    if (!apiResult) {
      throw Error(`No result for score of ${scorePercent}.`);
    }

    return apiResult;
  }

  // ----------------------------------------------------------------------------------------------------------- Request

  /**
   * Request API data from URLs.
   *
   * Preload all requests at once to prevent future data fetching and possible delays/outages
   * (e.g. when user is offline later in the application due to unexpected connection change).
   */
  private requestApiData(): Promise<any> {
    const urls = this.urls;

    const promises = [this.requestUrl(urls.quiz), this.requestUrl(urls.result)];

    return Promise.all(promises).then(this.saveApiResultsAsJson.bind(this)).catch(this.handleRequestError);
  }

  // ---------------------------------------------------------------------------------------------------- Ajax

  /**
   * 'Promisify' GET-request to fetch API data from a single URL.
   */
  private requestUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.onreadystatechange = this.requestOnReadyStateChange.bind(this, request, resolve, reject);

      request.open('GET', url, true);
      request.send();
    });
  }

  /**
   * XMLHttpRequest event listener: Wait till request is finished or errored
   * and resolve Promise with expected data.
   */
  private requestOnReadyStateChange(request: XMLHttpRequest, resolve, reject): object | null {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
      resolve(request.responseText);
    } else {
      reject({
        status: request.status,
        statusText: request.statusText,
      });
    }
  }

  /**
   * Promise catch to handle API request errors.
   */
  private handleRequestError(err): never {
    throw Error(err);
  }

  // ----------------------------------------------------------------------------------------------------------- Results

  /**
   * Fix, sanitise and save API results as JSON object.
   */
  private saveApiResultsAsJson(res): void | never {
    let [quiz, result] = res;
    const data = this.data;

    try {
      // Fix + Sanitize data
      quiz = quiz.replace(/http:/g, 'https:');
      quiz = quiz.replace(/mutiplechoice/g, 'multiplechoice');
      result = result.replace(/http:/g, 'https:');

      data.quiz = JSON.parse(quiz);
      data.result = JSON.parse(result);
    } catch (error) {
      throw new Error(error);
    }
  }
}
