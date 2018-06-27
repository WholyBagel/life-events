import $ from 'jquery';
import CONSTANTS from '../constants';

import { addOrUpdateInfo, updateHeroes } from './util';

// import LIFESTYLE_PLANS_PAGE
// import { addOrUpdateInfo, updateHeroes } from './util';
// import pages from '../pages';

const { PAGE_IDS, QUESTION_IDS } = CONSTANTS.IDs;
const { LIFESTYLE_PLANS_PAGE } = PAGE_IDS;

export default {

  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD}-value`).html(`$${e.target.value}`);

    const infoItems = [
      {
        key: 'Food',
        val: `$${state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD]}`
      }
    ];
    addOrUpdateInfo(infoItems);

    state.ui[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD] = (`$${e.target.value}`);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };

    updateHeroes();
  },

  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN}-value`).html(`$${e.target.value}`);
    const infoItems = [
      {
        key: 'children',
        val: state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN]
      }
    ];
    addOrUpdateInfo(infoItems);

    state.ui[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN] = (e.target.value);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };

    updateHeroes();
  },
  // new work
  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES}-value`).html(`$${e.target.value}`);
    const infoItems = [
      {
        key: 'Hobbies',
        val: `$${state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES]}`
      }
    ];
    addOrUpdateInfo(infoItems);

    state.ui[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES] = (e.target.value);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };

    updateHeroes();
  },
  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION}-value`).html(`$${e.target.value}`);
    const infoItems = [
      {
        key: 'Transportation',
        val: `$${state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION]}`
      }
    ];
    addOrUpdateInfo(infoItems);

    state.ui[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION] = (e.target.value);

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };

    updateHeroes();
  }

};
