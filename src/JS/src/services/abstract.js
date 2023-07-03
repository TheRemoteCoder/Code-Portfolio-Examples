import AppConfig from '../config/app';

// Libraries
import EventLib from '../lib/event';
import RequestLib from '../lib/request';

/**
 * HTTP requests and events.
 */
export default class AbstractService {
  /**
   * Constructor sets dependencies.
   */
  constructor() {
    this.host = AppConfig.api.host[AppConfig.environment];
    this.routes = AppConfig.api.routes;

    this.eventLib = new EventLib();
    this.requestLib = new RequestLib();
  }

  /**
   * Get absolute URL for host and request.
   *
   * @param {String} method
   * @param {String} routeName
   * @return {String}
   * @public
   */
  getFullUrl(method, routeName) {
    return `${this.host}/${this.routes[method][routeName]}`;
  }
}
