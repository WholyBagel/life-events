import $ from 'jquery';
import { navigateForward, navigateBackward, navigateToAPage } from '../../../navigation';
// import CONSTANTS from '../../constants';

// const { IDs } = CONSTANTS;
// const { QUESTION_IDS, PAGE_IDS } = IDs;
// const { LIFESTYLE_PLANS_PAGE } = PAGE_IDS;

export const updateHeroes = () => {
  const hero1Value = state.data.moneyLeftCurrentYear;

  if (hero1Value > 0) {
    $('.grab').html('<div style="font-size: 4vh"><h1 style="margin-bottom:5%; font-size: 40px">Consider investing the money you have left.</h1> <p style="font-size: 20px; line-height: 150%;">If you invest money at a young age, it will compound over time and increase your net value.  To learn more to Consider saving your money in a special place for emergencies. You never know when one could occur and being prepared can go a long way and keep you from going into debt. Consider saving your money for a large purchase you plan to make in the future.</p> <a href="https://www.northwesternmutual.com/investments/" style="margin-top:5%;">Make Investments with Northwestern Mutual Here! </a></div>');
  } else {
    $('.grab').html('<div style="font-size: 4vh"><h1 style="margin-bottom:5%;font-size: 40px">Being in debt is not fun or good but small changes can help to avoid debt.</h1> <p style="font-size: 20px; line-height: 150%;">Watch how often you go out to eat or get coffee and try to buy groceries that are on sale or use coupons. Try to pay for things in cash whenever possible. Paying in cash typically causes you to spend less money. Look at the part of our budget that you spend the most on and think about how you might be able to cut down.</p> <a href="https://www.northwesternmutual.com/financial-planning/" style="margin-top:5%;">Learn to Budget with Northwestern Mutual Here! </a> </div>');
  }

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
    // const careerSalary = (item.val);

    if ($(`#info-row-${idKey}`).length) {
      $(`#info-row-${idKey} .val`).html(item.val);
    } else {
      $('#info-table').append(`<li id="info-row-${idKey}"><span class="key">${item.key}</span><span class="val" style="word-wrap: break-word; display: block;">${item.val}</span></li>`);
    }
    return item;
  });
};
