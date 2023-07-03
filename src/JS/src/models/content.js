import AppConfig from '../config/app';
import UrlLib from '../lib/url';

/**
 * Content parameter and identifier.
 * Get unique ID from URL.
 */
export default class ContentModel {
  /**
   * Constructor sets depedencies.
   */
  constructor() {
    this.prefix = AppConfig.prefix;
    this.exampleId = AppConfig.request.exampleId;

    this.urlLib = new UrlLib();
  }

  /**
   * Get example ID parameter from URL.
   *
   * @return {Number}
   * @public
   */
  getExampleId() {
    return +this.urlLib.getParam(this.exampleId);
  }
}
