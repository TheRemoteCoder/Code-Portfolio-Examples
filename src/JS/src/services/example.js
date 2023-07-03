import AbstractService from './abstract';

/**
 * Example data storage.
 */
export default class ExampleService extends AbstractService {
  /**
   * Constructor sets properties.
   */
  constructor() {
    super();

    this.events = {
      receivedData: 'exampleService.receivedData',
    };
  }

  /**
   * Submit data to backend to save it.
   * Backend info: It will only be saved if valid.
   *
   * @param {Object} formData
   * @return {Object} Promise HTTP request
   * @public
   */
  save(formData) {
    const url = this.getFullUrl('post', 'example');
    const promise = this.requestLib.post(url, formData);

    return promise
      .then((result) => {
        this.eventLib.publish(this.events.receivedData, result);

        return true;
      })
      .catch((error) => {
        throw new Error(error.stack);
      });
  }
}
