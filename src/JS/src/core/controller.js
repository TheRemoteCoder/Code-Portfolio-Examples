// Core
import UiFormAutofillCore from './ui/form/autofill';
import UiFormAutosaveCore from './ui/form/autosave';
import UiModalCore from './ui/modal';
// ...

// Helper
import AuthenticationHelper from '../helper/authentication';
import CompatibilityHelper from '../helper/compatibility';
import PageClassHelper from '../helper/page-class';

// Libraries
import EventLib from '../lib/event';
import StorageLib from '../lib/storage';

// Models
import ContentModel from '../models/content';
import PageModel from '../models/page';

// Services
import PageService from '../services/page';

// Views
import InitView from '../views/init';

/**
 * Single-page application controller.
 */
export default class ControllerCore {
  /**
   * Constructor sets dependencies.
   * Run helpers and call index action.
   *
   * @param {Object} bootstrapRef Bootstrap module reference
   */
  constructor(bootstrapRef) {
    const uniqueId = new ContentModel().getUniqueId();
    const storageLib = new StorageLib(uniqueId);

    this.events = {
      publish: {
        ready: 'controllerCore.ready',
      },
    };

    // Helper
    this.authenticationHelper = new AuthenticationHelper();
    this.compatibilityHelper = new CompatibilityHelper();
    this.pageClassHelperRef = PageClassHelper;

    // Libraries
    this.eventLib = new EventLib();

    // Core - UI
    this.uiFormAutofillCore = new UiFormAutofillCore(storageLib);
    this.uiFormAutosaveCore = new UiFormAutosaveCore(storageLib);
    this.uiModalCore = new UiModalCore(bootstrapRef);
    // ...

    // Models
    this.pageModelRef = PageModel;

    // Services
    this.pageService = new PageService();

    // Views
    this.initViewRef = InitView;

    this.indexAction();
  }

  /**
   * Main action for application.
   * - Request API data and pass result to view.
   * - Initialize all modules after view is ready.
   *
   * @private
   */
  indexAction() {
    const promise = this.pageService.getContent();

    this.authenticationHelper.init();
    this.compatibilityHelper.init();

    promise
      .then((apiData) => this.createPageModel(apiData))
      .then((pageModel) => this.hydrateView(pageModel))
      .then((pageModel) => this.initModules(pageModel))
      .then(() => this.publishReady())
      .catch((error) => {
        throw new Error(error.stack);
      });
  }

  /**
   * Create page model from API data.
   *
   * @param {Object} apiData
   * @return {Object}
   * @private
   */
  createPageModel(apiData) {
    return new this.pageModelRef(apiData);
  }

  /**
   * Hydrate view with page model data.
   *
   * @param {Object} pageModel Page model class instance
   * @return {Object}
   * @private
   */
  hydrateView(pageModel) {
    /* eslint-disable no-new */
    new this.initViewRef(pageModel);
    new this.pageClassHelperRef(pageModel);

    return pageModel;
  }

  /**
   * Initialize UI modules.
   *
   * Required order
   * 1) Autofill must come first or saving is triggered unwantedly on form change.
   * 2) General UI modules, sorted A-Z.
   * 3) Tooltips must come last after whole UI has been rendered.
   *
   * @param {Object} pageModel Page model class instance
   * @private
   */
  initModules(pageModel) {
    // 1)
    this.uiFormAutofillCore.init();
    this.uiFormAutosaveCore.init();

    // 2)
    this.uiModalCore.init();
    // ...

    // 3)
    //this.uiTooltipsCore.init();
  }

  /**
   * Publish application ready event.
   * Fire after all modules are initialized and can be used.
   *
   * @private
   */
  publishReady() {
    this.eventLib.publish(this.events.publish.ready);
  }
}
