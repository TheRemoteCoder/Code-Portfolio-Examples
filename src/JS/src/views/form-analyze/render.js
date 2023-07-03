// Views
import AbstractRenderView from '../abstract-render';

/**
 * Analyze form UI rendering.
 *
 * @todo Improve - Bind animation duration to real Ajax load time (not hardcoded value)
 */
export default class RenderFormAnalyzeView extends AbstractRenderView {
  /**
   * Constructor sets dependencies and initializes component.
   *
   * @param {Object} component Component element reference from parent class as 'this' scope
   */
  constructor(component) {
    super();

    this.win = window;
    this.component = component;

    this.data = {
      // Compromise towards slower Ajax loading times
      animationDurationMs: 3000,
    };

    this.selectors = {
      submit: 'x-form-analyze--submit',
      loading: 'x-form-analyze--loading',
    };
  }

  /**
   * Toggle submit button animation that resets itself after finishing.
   *
   * @private
   */
  toggleButtonAnimation() {
    this.toggleButtons(true);

    this.win.setTimeout(() => {
      this.toggleButtons(false);
    }, this.data.animationDurationMs);
  }

  /**
   * Toggle between loading and subit buttons.
   *
   * @param {Boolean} toggle True = Show loading/Hide submit; False = Inverted order
   * @private
   */
  toggleButtons(toggle) {
    /* eslint-disable prefer-destructuring */
    const domToggleLib = this.domToggleLib;
    const selectors = this.selectors;

    const btnLoading = document.getElementById(selectors.loading);
    const btnSubmit = document.getElementById(selectors.submit);

    if (toggle) {
      domToggleLib.hideElement(btnSubmit);
      domToggleLib.showElement(btnLoading);
    } else {
      domToggleLib.hideElement(btnLoading);
      domToggleLib.showElement(btnSubmit);
    }
  }
}
