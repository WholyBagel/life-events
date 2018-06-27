import CONSTANTS from '../constants';
import { showError, removeError, addOrUpdateInfo, updateHeroes } from './util';
import pages from '../pages';

const { PAGE_IDS, QUESTION_IDS } = CONSTANTS.IDs;
const { INITIAL_PAGE } = PAGE_IDS;

export default {
  [QUESTION_IDS[INITIAL_PAGE].AGE_TEXT]: (e) => {
    const parsedValue = parseInt(e.target.value, 10);
    let isValid = !Number.isNaN(parsedValue);

    isValid = !!(isValid && (parsedValue >= 18 && parsedValue <= 65));

    if (isValid) {
      state.ui.values[QUESTION_IDS[INITIAL_PAGE].AGE_TEXT] = parsedValue;
      state.ui.values.info[pages[1].questions[0].info] = parsedValue;
      const infoItems = [
        {
          key: pages[1].questions[0].info,
          val: parsedValue
        }
      ];
      addOrUpdateInfo(infoItems);
      removeError(QUESTION_IDS[INITIAL_PAGE].AGE_TEXT);
    } else {
      showError(QUESTION_IDS[INITIAL_PAGE].AGE_TEXT, 'Invalid Age');
    }
  },
  [QUESTION_IDS[INITIAL_PAGE].NETWORTH_TEXT]: (e) => {
    const parsedValue = parseInt(e.target.value, 10);
    const isValid = !Number.isNaN(parsedValue);
    if (isValid) {
      state.ui.values[QUESTION_IDS[INITIAL_PAGE].NETWORTH_TEXT] = Number.isNaN(parsedValue) ? 0 : parsedValue;

      const infoItems = [
        {
          key: pages[1].questions[1].info,
          val: parsedValue
        }
      ];
      addOrUpdateInfo(infoItems);

      const financialData = state.calculateFunds();

      state.data = { ...state.data, financialData };
    } else {
      state.ui.values[QUESTION_IDS[INITIAL_PAGE].NETWORTH_TEXT] = undefined;
    }
  },
  [QUESTION_IDS[INITIAL_PAGE].CURRENT_ANNUAL_INCOME_TEXT]: (e) => {
    const value = parseInt(e.target.value, 10);
    state.ui.values[QUESTION_IDS[INITIAL_PAGE].CURRENT_ANNUAL_INCOME_TEXT] = Number.isNaN(value) ? 0 : value;

    const financialData = state.calculateFunds();

    state.data = { ...state.data, financialData };

    updateHeroes(financialData);
  },
  /* [QUESTION_IDS[INITIAL_PAGE].STATES_DROPDOWNN]: (e) => {
    console.log('state: ', e.target.value);
  }
  */
  [QUESTION_IDS[INITIAL_PAGE].ENTER_NAME_TEXT]: (e) => {
    state.ui.values[QUESTION_IDS[INITIAL_PAGE].ENTER_NAME_TEXT] = e.target.value;
    console.log('hi');
    const infoItems = [
      {
        key: 'Name',
        val: state.ui.values[QUESTION_IDS[INITIAL_PAGE].ENTER_NAME_TEXT]
      }
    ];
    addOrUpdateInfo(infoItems);

    // state.ui[QUESTION_IDS[OTHER_PLANS_PAGE].STUDENTLOANS] = (e.target.value);

    // const financialData = state.calculateFunds();

    // state.data = { ...state.data, financialData };
  }

};
