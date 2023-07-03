// Helper
import ViewApiDataHelper from '../helper/view-api-data';

// Libraries
import EventLib from '../lib/event';

/**
 * Abstract view with shared state (API data) across all component instances.
 * Responsible for data and event handling.
 */
export default class AbstractView extends HTMLElement {
  /**
   * API data for all components.
   * Intended read-only - Don't modify!
   *
   * @var {Object} apiData See schema documentation.
   */
  static apiData = {};

  /**
   * Page properties for all components.
   * Intended read-only - Don't modify!
   *
   * @var {Object} props
   */
  static props = {};

  /**
   * Constructor sets dependencies.
   */
  constructor() {
    super();

    this.viewApiDataHelper = new ViewApiDataHelper(this.getApiData());
    this.eventLib = new EventLib();
  }

  /**
   * Get API data, optionally for specific data key.
   *
   * @param {String} key
   * @return {Object|*}
   * @protected
   */
  getApiData(key) {
    return key ? AbstractView.apiData[key] : AbstractView.apiData;
  }

  /**
   * Get page properties, optionally for specific data key.
   *
   * @param {String} key
   * @return {Object|*}
   * @protected
   */
  getProps(key) {
    return key ? AbstractView.props[key] : AbstractView.props;
  }

  /**
   * Set API data for all component instances.
   *
   * @param {Object} apiData
   * @public
   */
  static setData(apiData) {
    AbstractView.apiData = apiData;
  }

  /**
   * Set page properties for all component instances.
   *
   * @param {Object} props
   * @public
   */
  static setProps(props) {
    AbstractView.props = props;
  }
}
