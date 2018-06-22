import $ from 'jquery';
import CONSTANTS from '../constants';

import { downHeroes, addOrUpdateInfo } from './util';

// import LIFESTYLE_PLANS_PAGE
// import { showError, removeError, addOrUpdateInfo, updateHeroes } from './util';
// import pages from '../pages';

const { PAGE_IDS, QUESTION_IDS } = CONSTANTS.IDs;
const { LIFESTYLE_PLANS_PAGE } = PAGE_IDS;

export default {
  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD}-value`).html(e.target.value);

    const infoItems = [
      {
        key: 'food',
        val: state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD]
      }
    ];
    addOrUpdateInfo(infoItems);
    downHeroes(e.target.value);
  },
  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN}-value`).html(e.target.value);
    const infoItems = [
      {
        key: 'children',
        val: state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].CHILDREN]
      }
    ];
    addOrUpdateInfo(infoItems);

    downHeroes(e.target.value * 270);
  },
  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES}-value`).html(e.target.value);
    const infoItems = [
      {
        key: 'hobbies',
        val: state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].HOBBIES]
      }
    ];
    addOrUpdateInfo(infoItems);

    // downHeroes(e.target.value * 270);
  },
  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION}-value`).html(e.target.value);
    const infoItems = [
      {
        key: 'transportation',
        val: state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].TRANSPORTATION]
      }
    ];
    addOrUpdateInfo(infoItems);

    // downHeroes(e.target.value * 270);
  }
};
