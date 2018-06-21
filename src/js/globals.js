
import pages, { setInputEvents, selectInputClickEvent } from './questions/pages';

const state = {
  ui: {
    navigation: {
      currentPage: 0
    },
    pages,
    values: {
      // foodSliderInput: 133,
      info: {

      }
    }
  },
  data: {

  }
};

export { setInputEvents, selectInputClickEvent };
export default state;
