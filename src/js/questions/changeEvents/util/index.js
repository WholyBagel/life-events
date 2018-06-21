import $ from 'jquery';
import { navigateForward, navigateBackward, navigateToAPage } from '../../../navigation';
import CONSTANTS from '../../constants';

const { IDs } = CONSTANTS;
const { QUESTION_IDS, PAGE_IDS } = IDs;
const { LIFESTYLE_PLANS_PAGE } = PAGE_IDS;

export const updateHeroes = (financialData) => {
  const dataAt65 = financialData.find(item => item.age === 65);
  let netWorthAt65 = Math.round(dataAt65.totalNetworth);
  const dataAtCurrent = financialData[0];

  let salary = Math.round(dataAtCurrent.currentAnnualSalary);

  // Setting numbers on heroes
  netWorthAt65 = netWorthAt65.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  salary = salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  $('#hero_3 h1').html(netWorthAt65);
  $('#hero_1 h1').html(salary);
};
export const downHeroes = (deduction) => {
  state.ui.values[QUESTION_IDS[LIFESTYLE_PLANS_PAGE].FOOD] = deduction;
  state.calculateFunds();
  const dataAtCurrent = state.data.financialData[0];
  const salary = dataAtCurrent.currentAnnualSalary;

  const finaldeduction = deduction * 52;
  const moneySpending = salary - finaldeduction;

  const dataAt65 = state.data.financialData.find(item => item.age === 65);
  const netWorthAt65 = Math.round(dataAt65.totalNetworth);

  $('#hero_1 h1').html(moneySpending.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
  $('#hero_3 h1').html(netWorthAt65.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
};

export const showError = (id, msg) => {
  const $currentElement = $(`#${id}`);
  $currentElement.addClass('has-error');
  $(`<span id="error-${id}" class="error">${msg}</span>`).insertAfter($currentElement);

  $('#navigate-forward').addClass('disabled');
  $('#navigate-forward').off('click', navigateForward);

  $('#navigate-back').addClass('disabled');
  $('#navigate-back').off('click', navigateBackward);

  $('.nav-button').addClass('disabled');
  $('.nav-button').off('click', navigateToAPage);

  state.ui.hasPageError = true;
};

export const removeError = (id) => {
  const $currentElement = $(`#${id}`);
  $currentElement.removeClass('has-error');
  $(`#error-${id}`).remove();

  $('#navigate-forward').removeClass('disabled');
  $('#navigate-forward').off('click', navigateForward).on('click', navigateForward);

  $('#navigate-back').removeClass('disabled');
  $('#navigate-back').off('click', navigateBackward).on('click', navigateBackward);

  $('.nav-button').removeClass('disabled');
  $('.nav-button').off('click', navigateToAPage).on('click', navigateToAPage);

  state.ui.hasPageError = false;
};

export const addOrUpdateInfo = (i) => {
  i.map((item) => {
    const idKey = item.key.replace(/\s/g, '');
    if ($(`#info-row-${idKey}`).length) {
      $(`#info-row-${idKey} .val`).html(item.val);
    } else {
      $('#info-table').append(`<li id="info-row-${idKey}"><span class="key">${item.key}</span><span class="val" style="word-wrap: break-word; display: block;">${item.val}</span></li>`);
    }
    return item;
  });
};
