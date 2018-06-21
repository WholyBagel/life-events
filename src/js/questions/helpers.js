/* global state:true */
import $ from 'jquery';

export const setInputEvents = () => {
  state.ui.pages.map((page) => {
    (page.questions || []).map((question) => {
      if (question.changeEvent) {
        $(`#${question.id}`).change(question.changeEvent);
      }
      return question;
    });
    return page;
  });
};

export function selectInputClickEvent () {
  const $selectParent = ($(this).parents('.uitk-select') || {});
  const getQuestion = question => question.id === $selectParent.find('input')[0].id;

  const currentPage = state.ui.pages[state.ui.navigation.currentPage];
  let $liCheckbox;
  let checkedValues = '';
  $(this).toggleClass('active');

  const currentQuestion = currentPage.questions.find(getQuestion);
  currentQuestion.changeEvent && currentQuestion.changeEvent(this.id);

  if ($selectParent.hasClass('multiple')) {
    $liCheckbox = $(this).find('input[type="checkbox"]');
    $liCheckbox.prop('checked', !$liCheckbox.prop('checked'));
    checkedValues = $selectParent.find('input:checkbox:checked').map(() => $(this).siblings('span').text()).get().join(', ');
    $selectParent.find('.select-input').val(checkedValues);
  } else {
    checkedValues = $(this).text();
    $selectParent.find('.select-input').val(checkedValues);
    $(this).siblings().removeClass('active');
    $selectParent.removeClass('is-open');
  }
}

const helpers = {
  setInputEvents,
  selectInputClickEvent
};

export default helpers;
