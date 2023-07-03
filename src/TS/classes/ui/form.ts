import IUiScreen from '../../interfaces/ui/screen';

import Api from '../core/api';
import Config from '../core/config';

import HelperMath from '../helper/math';

import PubSub from '../../lib/pubsub';

import { ApiDataQuizQuestionType } from '../../types/api-data';
import { PubSubEvents } from '../../types/pubsub-events';

/**
 * Form elements.
 *
 * - Constructor
 * - HTML
 * - Events
 *   - Bind
 *   - Listeners
 * - Render
 * - Form fields
 *   - Checkbox
 *   - Radio
 * - Validation
 *   - Form
 *   - API data
 * - Sound
 *
 * @todo  Outsource validation + Sound in separate class.
 */
export default class UiForm implements IUiScreen {
  /**
   * Types of event bindings.
   */
  private readonly events: PubSubEvents = {
    publish: {
      isFinished: 'UiForm:isFinished', // Number  (Index)
      isValidated: 'UiForm:isValidated', // Object  (Quiz data)
      isValid: 'UiForm:isValid', // Boolean (true)
      isInvalid: 'UiForm:isInvalid', // Boolean (true)
    },
    subscribe: {
      stageIsReady: 'UiStage:stageIsReady', // Boolean (true)
    },
  };

  /**
   * CSS selectors for form validation states.
   */
  private readonly cssFormStateSelectors: any = {
    valid: '--is-valid',
    invalid: '--is-invalid',
  };

  /**
   * API data specific for this screen.
   */
  private apiData: any;

  /**
   * Numeric screen index as ID and sort order.
   */
  private index: number;

  /**
   * Generated HTML DocumentFragment object.
   */
  private domHtml: object;

  /** API class instance */
  private api: Api;

  /** HelperMath class instance */
  private helperMath: HelperMath;

  /** PubSub class instance */
  private pubSub: PubSub;

  // ------------------------------------------------------------------------------------------------------- Constructor

  /**
   * Instanciate dependencies.
   * Set stored + prepared API data for current form; create HTML and bind events.
   */
  constructor(apiData: any, index: number = 1) {
    this.apiData = apiData;
    this.index = index;

    this.api = Api.getInstance(Api);
    this.helperMath = HelperMath.getInstance(HelperMath);
    this.pubSub = PubSub.getInstance(PubSub);

    this.createHtml().bindEvents();
  }

  // -------------------------------------------------------------------------------------------------------------- HTML

  /**
   * Return generated HTML DocumentFragment object.
   */
  public getHtml(): object {
    return this.domHtml;
  }

  // ------------------------------------------------------------------------------------------------------------ Events
  // ---------------------------------------------------------------------------------------------------- Bind

  /**
   * Bind events.
   */
  private bindEvents(): void {
    this.pubSub.subscribe(this.events.subscribe.stageIsReady, this.onStageIsReady.bind(this), true);
  }

  /**
   * Bind form event listeners.
   */
  private bindFormEvents() {
    const formId = this.index; // +apiData.q_id; // Cast as number
    const submitBtn = document.getElementById(`js-screen-quiz__form-submit-${formId}`);
    const label = document.querySelectorAll(`#app-example-quiz__form-${formId} .o-form-label`);
    const toggle = document.querySelectorAll(`#app-example-quiz__form-${formId} .o-form-input__check-toggle`);

    submitBtn.addEventListener('click', this.onFormSubmitBtnClick.bind(this), { capture: true });

    // Only ok if hardcoded in a moonless night
    // Better solutions - Get all elements at once + reduce selectors or use the window for sounds?
    label.forEach((el, index, parent) => {
      el.addEventListener('click', this.onFormInputClick.bind(this));
    });
    toggle.forEach((el, index, parent) => {
      el.addEventListener('click', this.onFormInputClick.bind(this));
    });
  }

  // ----------------------------------------------------------------------------------------------- Listeners

  /**
   * Event callback if Stage with all DOM objects is ready.
   *
   * - Bind form event listeners.
   */
  private onStageIsReady(): void {
    this.bindFormEvents();
  }

  /**
   * Form submit button event callback.
   */
  private onFormSubmitBtnClick(event: any): void {
    this.validateForm(event.currentTarget);
    this.playInteractionSound();
  }

  /**
   * Form input button event callback.
   */
  private onFormInputClick(event: any): void {
    this.playInteractionSound();
  }

  // ------------------------------------------------------------------------------------------------------------ Render

  /**
   * Enrich HTML with API data.
   */
  private createHtml(): UiForm {
    const apiData: any = this.apiData;
    let formFields: object = {};

    const formId: number = this.index; // +apiData.q_id; // Cast as number
    const questionType: string = apiData.question_type;
    const answers: any = apiData.possible_answers;

    if (!this.isValidQuestionType(questionType)) {
      throw Error(`Question type '${questionType}' is not valid.`);
    }

    switch (questionType) {
      case 'multiplechoice-single': {
        formFields = this.createFormFields(formId, answers, 'radio');
        break;
      }
      case 'multiplechoice-multiple': {
        formFields = this.createFormFields(formId, answers, 'checkbox');
        break;
      }
      case 'truefalse': {
        formFields = this.createFormFieldsBoolean(formId);
        break;
      }
      default: {
        // Catched by exception handler
        break;
      }
    }

    this.domHtml = formFields;

    return this;
  }

  // --------------------------------------------------------------------------------------------- Form fields
  // -------------------------------------------------------------------------------------- Checkbox

  /**
   * Create checkbox/radio option form fields from API data
   * for single- and multiple answer questions.
   */
  private createFormFields(formId: number, answers: [], type: 'checkbox' | 'radio'): object {
    const hasRandomAnswers = Config.get('randomizeQuizAnswerOrder');
    const element = document.createElement('div');
    let answersRender = answers;

    if (hasRandomAnswers) {
      answersRender = this.helperMath.shuffleArray(answers);
    }

    answersRender.forEach((obj: any, index: number, arr: any) => {
      const answerId = obj.a_id;
      const id = `${formId}-${answerId}`;
      const text = obj.caption;

      element.innerHTML += `<label class="o-form-label c-screen-quiz__form-label" for="question-${id}">
          <input class="o-form-input o-form-input--custom c-screen-quiz__form-input" id="question-${id}" name="questions" value="${answerId}" type="${type}">
          <span class="o-form-input__check-toggle o-form-input__check-toggle--${type}"></span> ${text} </label>`;
    });

    return element;
  }

  /**
   * Create checkbox/radio option form fields from API data
   * for yes/no answer questions.
   */
  private createFormFieldsBoolean(formId: number): object {
    const element = document.createElement('div');
    const answers = [
      { name: 'Yes', val: 1 },
      { name: 'No', val: 0 },
    ];

    answers.forEach((obj: any, index: number, arr: any) => {
      const answerId = obj.val;
      const id = `${formId}-${answerId}`;
      const text = obj.name;

      element.innerHTML += `<label class="o-form-label c-screen-quiz__form-label" for="question-${id}">
        <input class="o-form-input o-form-input--custom c-screen-quiz__form-input" id="question-${id}" name="questions" value="${answerId}" type="radio">
        <span class="o-form-input__check-toggle o-form-input__check-toggle--radio"></span> ${text} </label>`;
    });

    return element;
  }

  // ---------------------------------------------------------------------------------------------- Validation
  // ------------------------------------------------------------------------------------------ Form

  /**
   * Validate form input and change UI styles accordingly.
   * Disable button (prevent multiple clicks / redirects).
   *
   * Considered answer as valid if:
   * - Count of user answers matches count of API answers
   * - All API answers are included in selection
   *   - No other answers are included in selection
   */
  private validateForm(submitBtn: any): void {
    const apiData: any = this.apiData;
    const apiAnswer = apiData.correct_answer; // Array | Boolean | Number

    const formName = submitBtn.getAttribute('form');
    const form = document.getElementById(formName) as HTMLFormElement;
    const formData = new FormData(form);
    const formUserInputRaw = formData.getAll('questions'); // Array
    let isValid = false;

    event.preventDefault();
    event.stopPropagation();

    // Ignore empty forms if user did not select anything yet.
    // Alternative solution could be to disable the submit button temporary?
    if (this.isFormEmpty(formData)) {
      return;
    }

    if (Array.isArray(apiAnswer)) {
      isValid = this.isValidFormFromArray(formUserInputRaw, apiAnswer);
    } else if (typeof apiAnswer === 'number' || typeof apiAnswer === 'boolean') {
      // Cast values to numbers
      isValid = +formUserInputRaw[0] === +apiAnswer;
    } else {
      throw Error('Unexpected type of apiData.correct_answer not of Array/Boolean/Number.');
    }

    this.disableFormElements(form)
      .showValidationHtmlStatus(apiData, form, isValid)
      .showScoreHtml(apiData, form, isValid)
      .publishFormValidation(apiData, isValid);
  }

  /**
   * Validate form user input against API data for multiple answers (checkboxes).
   * Check if answer counts match and run a difference check to filter invalid answers.
   *
   * Considered answer as valid if:
   * - Count of user answers matches count of API answers
   * - All API answers are included in selection
   *   - No other answers are included in selection
   */
  private isValidFormFromArray(rawUserInput: FormDataEntryValue[], apiAnswer: any): boolean {
    const userInputNumbers = [];
    let isValid = false;

    // Convert raw form input to number to make filter() work
    rawUserInput.forEach((val, index, all) => {
      userInputNumbers.push(+val);
    });

    const isValidCount = apiAnswer.length === userInputNumbers.length;

    if (!isValidCount) {
      console.error('Invalid: Count of selected + available answer mismatch.');
      return false;
    }

    const difference = apiAnswer.filter((x) => !userInputNumbers.includes(x));
    isValid = difference.length === 0;

    return isValid;
  }

  /**
   * Hack: Get FormData length to check if it has been filled out.
   *
   * Why? Most 'FormData' API parts are not supported by TypeScript
   * yet and the workarounds are too complex and not fully functional.
   *
   * @todo  Improve as soon as FormData API support improves in future TypeScript.
   */
  private isFormEmpty(formData: FormData): boolean {
    let isEmpty = true;

    formData.forEach((id, key, parent) => {
      isEmpty = false;
    });

    return isEmpty;
  }

  /**
   * Disable old form elements to prevent multiple validation and events being fired.
   */
  private disableFormElements(form: HTMLFormElement): UiForm {
    const formId = this.index;
    const inputs = form.querySelectorAll('input');
    const submitBtn = document.getElementById(`js-screen-quiz__form-submit-${formId}`);

    inputs.forEach((element, index, parent) => {
      element.setAttribute('disabled', 'true');
    });

    // Fade out unneeded submit button (will be replaced with score)
    submitBtn.classList.add('--hidden');

    setTimeout(() => {
      submitBtn.style.display = 'none';
    }, 100);

    return this;
  }

  /**
   * Set CSS classes to show the forms validation result.
   */
  private showValidationHtmlStatus(apiData: any, form: HTMLFormElement, isValid: boolean): UiForm {
    const validAnswers = this.api.getNumericAnswersFromApiData(apiData);
    const cssClasses = this.cssFormStateSelectors;
    const inputs = form.querySelectorAll('[name=questions]');

    inputs.forEach((element, index, parent) => {
      const val = element.getAttribute('value');
      const elementIsValid = validAnswers.indexOf(+val) > -1;
      const elementLabel = element.closest('.o-form-label');
      const elementToggle = element.nextElementSibling;

      if (elementIsValid) {
        elementLabel.classList.add(cssClasses.valid);
        elementToggle.classList.add(cssClasses.valid);
      } else {
        elementLabel.classList.add(cssClasses.invalid);
        elementToggle.classList.add(cssClasses.invalid);
      }
    });

    return this;
  }

  /**
   * Show score HTML on screen.
   */
  private showScoreHtml(apiData: any, form: HTMLFormElement, isValid: boolean): UiForm {
    const formId = this.index;
    const scoreText = document.querySelector(`#js-screen-quiz-${formId} .js-screen-quiz__score-status`);
    const points = apiData.points;
    const text = isValid ? (+points === 1 ? `+ ${points} point` : `+ ${points} points`) : '0 points';

    scoreText.innerHTML = text;
    scoreText.classList.add('--is-visible');

    return this;
  }

  /**
   * Publish form validation state after a certain delay for visual purposes.
   *
   * @todo  Decouple validation from animation: Move interval into Stage class and change events.
   */
  private publishFormValidation(apiData: any, isValid: boolean): UiForm {
    const pubSub = this.pubSub;
    const events = this.events.publish;
    const index = this.index;
    const delay = Config.get('screenSwitchDelay');

    // Used to disable current Quiz screen + Loading bar animation
    pubSub.publish(events.isFinished, {
      index,
      isValid,
    });

    setTimeout(() => {
      // Used for Screen + Score changes
      pubSub.publish(events.isValidated, {
        apiData,
        isValid,
      });

      pubSub.publish(isValid ? events.isValid : events.isInvalid, true);
    }, delay);

    return this;
  }

  // -------------------------------------------------------------------------------------- API data

  /**
   * Validate question type text from API data:
   * Test if passed question type exists in data type definition.
   */
  private isValidQuestionType(questionType: string): boolean {
    const isValid = Object.values(ApiDataQuizQuestionType).includes(questionType);

    return isValid;
  }

  // --------------------------------------------------------------------------------------------------- Sound

  /**
   * Play click sound to enhance app-like feeling.
   */
  private playInteractionSound() {
    const sound = document.getElementById('app-example-sound_click') as HTMLAudioElement;

    try {
      sound.volume = 0.5;
      sound.play();
    } catch (e) {
      console.error(e);
    }
  }
}
