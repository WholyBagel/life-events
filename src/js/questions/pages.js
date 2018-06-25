/* eslint no-console: "off" */
import CONSTANTS from './constants';
import { setInputEvents, selectInputClickEvent } from './helpers';
import changeEvents from './changeEvents';

const {
  WELCOME_PAGE, INITIAL_PAGE, CAREER_PLANS_PAGE, LIFESTYLE_PLANS_PAGE, OTHER_PLANS_PAGE, SUMMARY_PLANS_PAGE
} = CONSTANTS.IDs.PAGE_IDS;
const { QUESTION_IDS } = CONSTANTS.IDs;
const {
  OCCUPATIONAL_DATA, EDU_PUBLIC_PRIVATE_DATA, HOURLY_OR_SALARY_DATA, STATES_DATA
} = CONSTANTS;

const welcomePage = {
  id: WELCOME_PAGE,
  nav: 'Welcome',
  title: 'Welcome',
  subtitle: 'The Financial Calculator will help you determine your current financial well-being and suggest ways to improve your current financial well-being.',
  subtitle2: 'Click on the Green Arrow to Begin',
  show: true
};

const initialInfoPage = {

  id: INITIAL_PAGE,
  nav: 'Get Started',
  title: "Let's start with where you are at...",
  show: false,
  questions: [
    {
      id: QUESTION_IDS[INITIAL_PAGE].AGE_TEXT,
      placeholder: 'Age',
      info: 'Starting age',
      type: 'text',
      required: true,
      show: true,
      changeEvent: changeEvents[QUESTION_IDS[INITIAL_PAGE].AGE_TEXT]

    },
    {
      id: QUESTION_IDS[INITIAL_PAGE].NETWORTH_TEXT,
      placeholder: 'Networth',
      info: 'Initial Net Worth',
      type: 'text',
      required: true,
      show: true,
      changeEvent: changeEvents[QUESTION_IDS[INITIAL_PAGE].NETWORTH_TEXT]
    },

    {
      id: QUESTION_IDS[INITIAL_PAGE].STATES_DROPDOWN,
      label: 'states',
      show: true,
      placeholder: 'Choose a your state...',
      info: 'states',
      type: 'select-dropdown',
      required: true,
      changeEvent: changeEvents[QUESTION_IDS[INITIAL_PAGE].STATES_DROPDOWN],
      values: STATES_DATA
    }
  ]
};

const careerPlansPage = {
  id: CAREER_PLANS_PAGE,
  nav: 'Career',
  title: 'What are your aspirations...',
  show: false,
  questions: [
    {
      id: QUESTION_IDS[CAREER_PLANS_PAGE].HOURLY_OR_SALARY_RADIO,
      label: 'Hourly or Salary',
      show: true,
      placeholder: 'Are you hourly or salary?',
      info: 'Hourly or Salarly',
      type: 'radio',
      required: true,
      changeEvent: changeEvents[QUESTION_IDS[CAREER_PLANS_PAGE].HOURLY_OR_SALARY_RADIO],
      values: HOURLY_OR_SALARY_DATA
    },
    {
      id: QUESTION_IDS[CAREER_PLANS_PAGE].CAREER_DROPDOWN,
      label: 'Career',
      show: true,
      placeholder: 'Choose a Career...',
      info: 'Career',
      type: 'select-dropdown',
      required: true,
      changeEvent: changeEvents[QUESTION_IDS[CAREER_PLANS_PAGE].CAREER_DROPDOWN],
      values: OCCUPATIONAL_DATA
    },

    {
      id: QUESTION_IDS[CAREER_PLANS_PAGE].EDUCATION_PUBLIC_PRIVATE_RADIO,
      label: 'Education',
      show: false,
      placeholder: 'Choose a type of school...',
      info: 'Public or Private',
      type: 'radio',
      required: false,
      changeEvent: changeEvents[QUESTION_IDS[CAREER_PLANS_PAGE].EDUCATION_PUBLIC_PRIVATE_RADIO],
      values: EDU_PUBLIC_PRIVATE_DATA
    },
    // working on now
    {
      id: QUESTION_IDS[CAREER_PLANS_PAGE].HOUR_RATE_TEXT,
      placeholder: 'Rate per Hour',
      show: false,
      info: 'Rate',
      type: 'text',
      required: true,
      changeEvent: changeEvents[QUESTION_IDS[CAREER_PLANS_PAGE].HOUR_RATE_TEXT]
    },
    // this too
    {
      id: QUESTION_IDS[CAREER_PLANS_PAGE].HOURS_WEEKLY_TEXT,
      placeholder: 'Hours per Week',
      show: false,
      info: 'Hours',
      type: 'text',
      required: true,
      changeEvent: changeEvents[QUESTION_IDS[CAREER_PLANS_PAGE].HOURS_WEEKLY_TEXT]
    }
  ]
};

const lifestylePage = {
  id: 'lifestylePage',
  nav: 'Lifestyle',
  title: 'How do you want to live...',
  show: false,
  required: true,
  questions: [
    {
      id: QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD,
      label: 'Food',
      show: true,
      text: 'How much do you spend on Food per week?',
      info: 'Food',
      type: 'range',
      min: '0',
      max: '200',
      value: '90',
      changeEvent: changeEvents[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD]
    },
    {
      id: QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES,
      label: 'Hobbies',
      show: true,
      text: 'How much do you spend on your hobbies and entertainment per month?',
      info: 'Hobbies',
      type: 'range',
      min: '0',
      max: '500',
      value: '250',
      changeEvent: changeEvents[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES]
    },
    {
      id: QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION,
      label: 'Transportation',
      show: true,
      text: 'How much do you spend on your transportation per month?',
      info: 'Transportation',
      type: 'range',
      min: '0',
      max: '1000',
      value: '500',
      changeEvent: changeEvents[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION]
    }
  ]
};
const otherPlansPage = {
  id: OTHER_PLANS_PAGE,
  nav: 'Additional Info',
  title: 'Here are some other important factors',
  show: false,
  required: true,
  questions: [
    {
      id: QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS,
      placeholder: 'How much do you pay in student loans per month?',
      show: false,
      info: 'StudentLoans',
      type: 'text',
      required: true,
      changeEvent: changeEvents[QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS]
    },
    {
      id: QUESTION_IDS[OTHER_PLANS_PAGE].HOUSING,
      placeholder: 'How much do you pay for housing per month?',
      show: false,
      info: 'Housing',
      type: 'text',
      required: true,
      changeEvent: changeEvents[QUESTION_IDS[OTHER_PLANS_PAGE].HOUSING]
    },
    {
      id: QUESTION_IDS[OTHER_PLANS_PAGE].UTILITIES,
      placeholder: 'How much do you spend in utilities per month?',
      show: false,
      info: 'Utilities',
      type: 'text',
      required: true,
      changeEvent: changeEvents[QUESTION_IDS[OTHER_PLANS_PAGE].UTILITIES]
    }
  ]
};

const summaryPlansPage = {
  id: SUMMARY_PLANS_PAGE,
  nav: 'Summary',
  title: 'Here is your financial spending',
  show: false,
  required: true

};

const pages = [
  welcomePage,
  initialInfoPage,
  careerPlansPage,
  lifestylePage,
  otherPlansPage,
  summaryPlansPage
];

export { setInputEvents, selectInputClickEvent };

export default pages;
