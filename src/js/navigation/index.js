/* global state:true */
import $ from 'jquery';

const showPageAndTitle = (page, show) => {
  $(`#${page.id}`).css('display', show ? 'block' : 'none');
  $(`#title-${page.id}`).css('display', show ? 'block' : 'none');
};

const showAndHideLowerNav = (pageIndex, numberOfPages) => {
  pageIndex === 0 ? $('#navigate-back').css('display', 'none') : $('#navigate-back').css('display', 'block');
  pageIndex === numberOfPages ? $('#navigate-forward').css('display', 'none') : $('#navigate-forward').css('display', 'block');
};

const highlightSideNav = (page, show) => {
  // show ? $(`#nav-${page.id}`).parent().addClass('active') : $(`#nav-${page.id}`).parent().removeClass('active')
  show ? $(`#nav-${page.id}`).css({ 'background-color': '#00a9df', color: 'white' }) : $(`#nav-${page.id}`).css({ 'background-color': '#01244A', color: 'white' });
};

const updatePages = (pages, pageIndex) => (pages || []).map((page, i) => {
  const show = i === pageIndex;
  const numberOfPages = pages.length - 1;
  showPageAndTitle(page, show);
  showAndHideLowerNav(pageIndex, numberOfPages);
  highlightSideNav(page, show);
  return { ...page, show };
});

function navigateToAPage () {
  const { pages } = state.ui;
  const checkID = page => page.id === $(this)[0].attributes.pageid.value;
  const index = pages.findIndex(checkID);
  const newPages = updatePages(state.ui.pages, index);
  const newState = {
    ...state,
    ui: {
      ...state.ui,
      navigation: { ...state.ui.navigation, currentPage: index },
      pages: newPages
    }
  };
  state = { ...newState };
}

const navigateForward = () => {
  const { currentPage } = state.ui.navigation;
  const { pages } = state.ui;
  const nextPage = currentPage >= pages.length - 1 ? pages.length - 1 : currentPage + 1;
  // const newPages = state.ui.pages.map((page, i) => {
  //     let show = i === nextPage ? true : false
  //     $(`#${page.id}`).css("display", show ? 'block' : 'none');
  //     return { ...page, show }
  // })
  const newPages = updatePages(state.ui.pages, nextPage);
  const newState = {
    ...state,
    ui: {
      ...state.ui,
      navigation: { ...state.ui.navigation, currentPage: nextPage },
      pages: newPages
    }
  };

  state = { ...newState };
};

const navigateBackward = () => {
  const { currentPage } = state.ui.navigation;
  const previousPage = currentPage <= 0 ? 0 : currentPage - 1;
  // const newPages = state.ui.pages.map((page, i) => {

  //     let show = i === previousPage ? true : false
  //     $(`#${page.id}`).css("display", show ? 'block' : 'none');
  //     return { ...page, show }
  // })
  const newPages = updatePages(state.ui.pages, previousPage);
  const newState = {
    ...state,
    ui: {
      ...state.ui,
      navigation: { ...state.ui.navigation, currentPage: previousPage },
      pages: newPages
    }
  };
  state = { ...newState };
};

export {
  navigateForward,
  navigateBackward,
  navigateToAPage
};
