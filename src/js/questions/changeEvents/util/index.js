import $ from 'jquery';
import { navigateForward, navigateBackward, navigateToAPage } from '../../../navigation';
// import CONSTANTS from '../../constants';

// const { IDs } = CONSTANTS;
// const { QUESTION_IDS, PAGE_IDS } = IDs;
// const { LIFESTYLE_PLANS_PAGE } = PAGE_IDS;

export const updateHeroes = () => {
  const hero1Value = state.data.financialData[0].moneyLeftPerYear;

  // const dataAt65 = state.data.financialData.find(item => item.age === 65);
  // console.log(dataAt65);
  // let netWorthAt65 = Math.round(dataAt65.totalNetworth);

  let moneyLeft = Math.round(hero1Value);
  let monthlyMoney = moneyLeft / 12;
  let weeklyMoney = moneyLeft / 52;

  // Setting numbers on heroes
  monthlyMoney = monthlyMoney.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  weeklyMoney = weeklyMoney.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  moneyLeft = moneyLeft.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  $('#hero_3 h1').html(weeklyMoney);
  $('#hero_2 h1').html(monthlyMoney);
  $('#hero_1 h1').html(moneyLeft);
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
