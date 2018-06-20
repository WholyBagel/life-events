import $ from 'jquery';
import { navigateForward, navigateBackward, navigateToAPage } from '../../../navigation';

export const updateHeroes = (financialData) => {
  const dataAt65 = financialData.find(item => item.age === 65);
  let netWorthAt65 = Math.round(dataAt65.totalNetworth);
  netWorthAt65 = netWorthAt65.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  $('#hero_3 h1').html(netWorthAt65);
  const dataAtCurrent = financialData[0];
  let salary = Math.round(dataAtCurrent.currentAnnualSalary);
  salary = salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  $('#hero_1 h1').html(salary);
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
