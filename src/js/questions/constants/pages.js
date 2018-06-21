export const INITIAL_PAGE = 'initialPage';
export const CAREER_PLANS_PAGE = 'careerPlansPage';
export const LIFESTYLE_PLANS_PAGE = 'lifestylePlansPage';
export const RETIREMENT_PLANS_PAGE = 'retirementPlansPage';
export const WELCOME_PAGE = 'welcomePage';

export const PAGE_IDS = {
  WELCOME_PAGE,
  INITIAL_PAGE,
  CAREER_PLANS_PAGE,
  LIFESTYLE_PLANS_PAGE,
  RETIREMENT_PLANS_PAGE
};

export const QUESTION_IDS = {
  [WELCOME_PAGE]: {},
  [INITIAL_PAGE]: {
    AGE_TEXT: 'ageInput',
    NETWORTH_TEXT: 'networthInput',
    CURRENT_ANNUAL_INCOME_TEXT: 'currentAnnualIncomeInput'
  },
  [CAREER_PLANS_PAGE]: {
    CAREER_DROPDOWN: 'careerInput',
    EDUCATION_PUBLIC_PRIVATE_RADIO: 'eduPublicPrivateInput',
    HOURLY_OR_SALARY_RADIO: 'hourlyOrSalaryRadio',
    HOUR_RATE_TEXT: 'hourlyRateInput',
    HOURS_WEEKLY_TEXT: 'hoursWeeklyInput'
  },
  [LIFESTYLE_PLANS_PAGE]: {
    MORTGAGE_RENT_RADIO: 'mortgageRentInput',
    FOOD: 'foodSliderInput'
  },
  [RETIREMENT_PLANS_PAGE]: {
    FOUR01K_TEXT: '401KInput'
  }
};

const IDs = {
  PAGE_IDS,
  QUESTION_IDS
};

export default IDs;
