import { IGenericClassAsync } from '../../../interfaces/generic-classes';

import Config from '../../core/config';

import HelperDom from '../../helper/dom';

import Singleton from '../../../lib/singleton';

/**
 * Screen type: Intro/Preloader.
 *
 * Concept: Mockup class to fade out the intro screen after a decent time so users get enough time to read the content.
 * A full implementation could involve the actual loading status of required assets.
 *
 * - Constructor
 * - Init
 * - Remove
 *
 * @todo  Find better way to handle DOM changes (less selector mess and spread in JS?).
 */
export default class UiScreenPreloader extends Singleton implements IGenericClassAsync {
  /**
   * Set 'loading time' in milliseconds.
   * Don't set the value here - It's read from a global config storage.
   */
  private delay: number = 0;

  /**
   * Screen container CSS ID selector.
   */
  private containerCssId: string = 'js-screen-intro';

  /**
   * DOM Helper class instance.
   */
  private helperDom: HelperDom;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Set Singleton state, instanciate dependencies and apply config.
   */
  constructor() {
    super(UiScreenPreloader);

    this.helperDom = HelperDom.getInstance(HelperDom);

    this.delay = Config.get('preloaderDelay');
  }

  // -------------------------------------------------------------------------------------------------------------- Init

  /**
   * Initialise class - Set timeout counter.
   */
  public initAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, this.delay);
    });
  }

  // ------------------------------------------------------------------------------------------------------------ Remove

  /**
   * Remove preloader itself:
   * - Hide the preloader screen container
   * - Remove body background image as it would interfere with other screens
   */
  public removeSelf(): void {
    const helper = this.helperDom;

    helper.toggleScreen(this.containerCssId, false);

    helper.removeClass('--is-visible', '#js-app-example_background');
    helper.addClass('--is-hidden', '#js-app-example_background');
  }
}
