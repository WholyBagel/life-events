// import { showError, removeError, addOrUpdateInfo, updateHeroes } from './util'
// import pages from '../pages';
// import $ from 'jquery';
import CONSTANTS from './../constants';

// import CONSTANTS from '../constants';

import { addOrUpdateInfo, updateHeroes } from './util';

const { PAGE_IDS, QUESTION_IDS } = CONSTANTS.IDs;
const { OTHER_PLANS_PAGE } = PAGE_IDS;

export default {
  [QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS]: (e) => {
    state.ui.values[QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS] = e.target.value;
    // $(`#${QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS}`).html(e.target.value);
    const infoItems = [
      {
        key: 'studentLoans',
        val: state.ui.values[QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS]
      }
    ];
    addOrUpdateInfo(infoItems);

    state.ui[QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS] = (e.target.value);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };
    updateHeroes();
  },
  [QUESTION_IDS[OTHER_PLANS_PAGE].HOUSING]: (e) => {
    console.log('before here');
    state.ui.values[QUESTION_IDS[OTHER_PLANS_PAGE].HOUSING] = e.target.value;
    // $(`#${QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS}`).html(e.target.value);
    console.log('here');
    const infoItems = [
      {
        key: 'Housing',
        val: state.ui.values[QUESTION_IDS[OTHER_PLANS_PAGE].HOUSING]
      }
    ];
    addOrUpdateInfo(infoItems);

    state.ui[QUESTION_IDS[OTHER_PLANS_PAGE].HOUSING] = (e.target.value);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };

    updateHeroes();
  },
  [QUESTION_IDS[OTHER_PLANS_PAGE].UTILITIES]: (e) => {
    state.ui.values[QUESTION_IDS[OTHER_PLANS_PAGE].UTILITIES] = e.target.value;
    // $(`#${QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS}`).html(e.target.value);
    const infoItems = [
      {
        key: 'Utilities',
        val: state.ui.values[QUESTION_IDS[OTHER_PLANS_PAGE].UTILITIES]
      }
    ];
    addOrUpdateInfo(infoItems);
    state.ui[QUESTION_IDS[OTHER_PLANS_PAGE].UTILITIES] = (e.target.value);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };
    updateHeroes();
  }
};
