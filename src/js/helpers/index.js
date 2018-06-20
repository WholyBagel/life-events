/* eslint no-console: "off" */
import helpersModule from 'handlebars-helpers';
import pages from '../questions/pages';
import state from '../globals';
import CONSTANTS from '../questions/constants';

const getPage = i =>
  // return true
  pages[i];

const getPages = () =>
  // return true
  pages;

const getHeroes = () =>
  CONSTANTS.HEROES_DATA;

const getState = () => state;

const debug = (optionalValue) => {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
};

const register = (Handlebars) => {
  const externalHelpers = helpersModule();

  const helpers = {
    ...externalHelpers,
    getState,
    getPage,
    getPages,
    getHeroes,
    debug
  };

  if (Handlebars && typeof Handlebars.registerHelper === 'function') {
    helpers.keys.map((prop) => {
      Handlebars.registerHelper(prop, helpers[prop]);
      return prop;
    });
  }

  return helpers;
};

const helpers = register(null);

export {
  register,
  helpers
};
