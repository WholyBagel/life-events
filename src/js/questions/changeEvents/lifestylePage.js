import $ from 'jquery';
import CONSTANTS from '../constants';
import { addOrUpdateInfo } from './util';

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
  }
};
