/**
 * Interactive tooltips via 'Bootstrap'.
 */
export default class UiTooltipsCore {
  /**
   * Constructor sets dependencies.
   *
   * @param {Object} bootstrapRef Bootstrap module reference
   */
  constructor(bootstrapRef) {
    this.tooltipRef = bootstrapRef.Tooltip;

    this.selectors = {
      all: '[data-bs-toggle="tooltip"]',
    };
  }

  /**
   * Create tooltips.
   *
   * @public
   */
  init() {
    this.create();
  }

  /**
   * Create tooltips for all alements.
   *
   * @private
   */
  create() {
    const tooltips = document.querySelectorAll(this.selectors.all);
    const tooltipTriggerList = [].slice.call(tooltips);

    tooltipTriggerList.map((tooltipTriggerEl) => new this.tooltipRef(tooltipTriggerEl));
  }
}
