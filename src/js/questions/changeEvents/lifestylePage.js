import $ from 'jquery';
import CONSTANTS from '../constants';

// import LIFESTYLE_PLANS_PAGE
// import { showError, removeError, addOrUpdateInfo, updateHeroes } from './util';
// import pages from '../pages';

const { PAGE_IDS, QUESTION_IDS } = CONSTANTS.IDs;
const { LIFESTYLE_PLANS_PAGE } = PAGE_IDS;

export default {
  [QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD]: (e) => {
    state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD] = e.target.value;
    $(`#${QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD}-value`).html(e.target.value);
  }
};
