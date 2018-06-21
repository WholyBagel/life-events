
import R from 'ramda';
import $ from 'jquery';
import CONSTANTS from '../constants';
import pages from '../pages';
import { addOrUpdateInfo } from './util';

const { OCCUPATIONAL_DATA, EDUCATION_LEVELS } = CONSTANTS;
const { CAREER_PLANS_PAGE } = CONSTANTS.IDs.PAGE_IDS;
const { QUESTION_IDS } = CONSTANTS.IDs;
export default {
  [QUESTION_IDS[CAREER_PLANS_PAGE].CAREER_DROPDOWN]: (careerId) => {
    state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].CAREER_DROPDOWN] = careerId;
    state.ui.values.info[pages[2].questions[0].info] = careerId;

    const index = CONSTANTS.OCCUPATIONAL_DATA.findIndex(element => element.id === careerId);

    const STARTING_SALARY_KEY = 'Starting Salary';
    const STARTING_SALARY_VAL = CONSTANTS.OCCUPATIONAL_DATA[index].salary;
    // const STARTING_FOOD_VAL = CONSTANTS.OCCUPATIONAL_DATA[index].food;

    const infoItems = [
      {
        key: pages[2].questions[0].info,
        val: CONSTANTS.OCCUPATIONAL_DATA[index].text
      },
      {
        key: STARTING_SALARY_KEY,
        val: STARTING_SALARY_VAL
      }
      // {
      //   key: 'food',
      //   val: STARTING_FOOD_VAL
      // }
    ];
    addOrUpdateInfo(infoItems);

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
      $(`#${QUESTION_IDS[CAREER_PLANS_PAGE].EDUCATION_PUBLIC_PRIVATE_RADIO}`).css('display', 'block');
    } else {
      $(`#${QUESTION_IDS[CAREER_PLANS_PAGE].EDUCATION_PUBLIC_PRIVATE_RADIO}`).css('display', 'none');
    }

    state.data = { ...state.data, financialData };
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
  [QUESTION_IDS[CAREER_PLANS_PAGE].HOURLY_OR_SALARY_RADIO]: (e) => {
    state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].HOURLY_OR_SALARY_RADIO] = e.target.id;
    if (state.ui.values[QUESTION_IDS[CAREER_PLANS_PAGE].HOURLY_OR_SALARY_RADIO] === 'Hourly') {
      const corgi = $('#careerInput').parent().hide();
      console.log(corgi);
      // careerPlansPage[questions[id: ]].toggle();
    } else {
      const corgi = $('#careerInput').parent().show();
      console.log(corgi);
    }
  }
};
