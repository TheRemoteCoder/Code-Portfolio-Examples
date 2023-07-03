import AbstractService from './abstract';

/**
 * Page data loader.
 */
export default class PageService extends AbstractService {
  /**
   * Load page content from API.
   *
   * @return {Object} Promise HTTP request
   * @public
   */
  getContent() {
    const url = this.getFullUrl('get', 'content');
    const promise = this.requestLib.get(url);

    return promise;
  }
}
