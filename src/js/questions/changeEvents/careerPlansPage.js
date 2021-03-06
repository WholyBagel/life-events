
import R from 'ramda';
import $ from 'jquery';
import CONSTANTS from '../constants';
import pages from '../pages';
import { addOrUpdateInfo, updateHeroes } from './util';

const { OCCUPATIONAL_DATA, EDUCATION_LEVELS } = CONSTANTS;
const { CAREER_PLANS_PAGE } = CONSTANTS.IDs.PAGE_IDS;
const { QUESTION_IDS } = CONSTANTS.IDs;
export default {
  [QUESTION_IDS[CAREER_PLANS_PAGE].CAREER_DROPDOWN]: (careerId) => {
    // state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].CAREER_DROPDOWN] = careerId;
    // state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].CAREER_DROPDOWN] = state.data.netIncome;
    state.ui.values.info[pages[2].questions[0].info] = careerId;
    const index = CONSTANTS.OCCUPATIONAL_DATA.findIndex(element => element.id === careerId);
    const STARTING_SALARY_VAL = CONSTANTS.OCCUPATIONAL_DATA[index].salary;
    state.data[QUESTION_IDS[CAREER_PLANS_PAGE].CAREER_DROPDOWN] = STARTING_SALARY_VAL;

    const financialData = state.calculateFunds();
    const careerData = R.filter(career => career.id === careerId, OCCUPATIONAL_DATA)[0];
    const additionalSchoolingRequired = [
      EDUCATION_LEVELS.SOME_COL_NO_DEG,
      EDUCATION_LEVELS.ASSC_DEG,
      EDUCATION_LEVELS.BACH_DEG,
      EDUCATION_LEVELS.POST_SEC_NON_DEG,
      EDUCATION_LEVELS.MAST_DEG,
      EDUCATION_LEVELS.DOC_OR_PROF_DEG
    ];

    if (R.contains(careerData.education, additionalSchoolingRequired)) {
      $(`#${QUESTION_IDS[CAREER_PLANS_PAGE].EDUCATION_PUBLIC_PRIVATE_RADIO}`).css('display', 'none');
    } else {
      $(`#${QUESTION_IDS[CAREER_PLANS_PAGE].EDUCATION_PUBLIC_PRIVATE_RADIO}`).css('display', 'none');
    }

    state.data = { ...state.data, financialData };
    console.log('random thing working with', state.data.financialData[0].netAnnualIncome);
    const infoItems = [
      {
        key: 'Base Salary',
        val: `$${CONSTANTS.OCCUPATIONAL_DATA[index].salary}`
      },
      {
        key: 'Taxed Salary',
        val: `$${state.data.financialData[0].netAnnualIncome}`
      },
      {
        key: 'Federal Tax',
        val: `${state.data.financialData[0].federalTaxBracket.percent * 100}%`
      },
      {
        key: 'State Tax',
        val: `${state.data.financialData[0].stateTaxBracket.percent * 100}%`
      }
    ];

    addOrUpdateInfo(infoItems);
    updateHeroes();
  },

  [QUESTION_IDS[CAREER_PLANS_PAGE].EDUCATION_PUBLIC_PRIVATE_RADIO]: (e) => {
    state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].EDUCATION_PUBLIC_PRIVATE_RADIO] = e.target.id;
    state.ui.values.info[pages[2].questions[1].info] = e.target.id;
    const infoItems = [
      {
        key: pages[2].questions[1].info,
        val: e.target.id
      }
    ];

    addOrUpdateInfo(infoItems);
  },
  // Checks the radio button to hide or show the content
  [QUESTION_IDS[CAREER_PLANS_PAGE].HOURLY_OR_SALARY_RADIO]: (e) => {
    state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].HOURLY_OR_SALARY_RADIO] = e.target.id;
    if (state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].HOURLY_OR_SALARY_RADIO] === 'Hourly') {
      $('#careerInput').parent().hide();
      $('#hourlyRateInput').parent().show();
      $('#hoursWeeklyInput').parent().show();
      // careerPlansPage[questions[id: ]].toggle();
    } else {
      $('#careerInput').parent().show();
      $('#hourlyRateInput').parent().hide();
      $('#hoursWeeklyInput').parent().hide();
    }
  },
  [QUESTION_IDS[CAREER_PLANS_PAGE].HOUR_RATE_TEXT]: (e) => {
    const value = parseInt(e.target.value, 10);
    state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].HOUR_RATE_TEXT] = Number.isNaN(value) ? 0 : value;
    const rate = state.calculateFunds();
    state.data = { ...state.data, rate };

    state.ui[QUESTION_IDS[CAREER_PLANS_PAGE].HOUR_RATE_TEXT] = (value);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };
    const infoItems = [
      {
        key: 'Base Salary',
        val: `$${state.data.financialData[0].currentAnnualSalary}`
      },
      {
        key: 'Taxed Salary',
        val: `$${state.data.financialData[0].netAnnualIncome}`
      },
      {
        key: 'Federal Tax',
        val: `${state.data.financialData[0].federalTaxBracket.percent * 100}%`
      },
      {
        key: 'State Tax',
        val: `${state.data.financialData[0].stateTaxBracket.percent * 100}%`
      }
    ];
    addOrUpdateInfo(infoItems);
    updateHeroes();
  },
  [QUESTION_IDS[CAREER_PLANS_PAGE].HOURS_WEEKLY_TEXT]: (e) => {
    const value = parseInt(e.target.value, 10);
    state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].HOURS_WEEKLY_TEXT] = Number.isNaN(value) ? 0 : value;
    const hours = state.calculateFunds();
    state.data = { ...state.data, hours };

    state.ui[QUESTION_IDS[CAREER_PLANS_PAGE].HOURS_WEEKLY_TEXT] = (value);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };
    const infoItems = [
      {
        key: 'Base Salary',
        val: `$${state.data.financialData[0].currentAnnualSalary}`
      },
      {
        key: 'Taxed Salary',
        val: `$${state.data.financialData[0].netAnnualIncome}`
      },
      {
        key: 'Federal Tax',
        val: `${state.data.financialData[0].federalTaxBracket.percent * 100}%`
      },
      {
        key: 'State Tax',
        val: `${state.data.financialData[0].stateTaxBracket.percent * 100}%`
      }
    ];
    addOrUpdateInfo(infoItems);
    updateHeroes();
  }

};
