import {
  filter,
  isEmpty,
  intersection,
  getOr,
  map,
  pipe,
  mergeAll,
  curry,
  partial,
  keys,
  identity,
  pickBy,
} from 'lodash/fp';

import appConfig from './config';

const {
  events: {
    filter_fields: customFilters,
  }
} = appConfig;

const types = { // depending on the type of filter,
  // take a filter config and return the function to accurately
  // filter a selection of units on this filter
  tagsFilter: ({key, _type, _config}) => // eslint-disable-line
    (selectedTagsArray, units) => (
      isEmpty(selectedTagsArray) ?
        units :
        filter(u => !isEmpty(intersection(selectedTagsArray, getOr([], key, u))))(units)
    )
};

const createFilterFunction = ({key, type, config}) => {
  console.log(key, type, config);
  return ({
    [key]: types[type]({key, type, config})
  });
};

const customFilterFunctions =
      pipe(
        map(createFilterFunction),
        mergeAll
      )(customFilters);

export const defaultFiltersFunctions = {
  term:
  (term, us) =>
    (isEmpty(term) ?
     us :
     filter(u => u.id.includes(term))(us))
  ,
};

export const sorts = {

};

export const buttons = ['manufacturer', 'pattern-maker', 'GOTS', 'fair-trade', 'cotton'];

export const filterFunctions =
      mergeAll([
        defaultFiltersFunctions,
        customFilterFunctions,
      ]);

export const applyFilters = curry((filters, units) => {
  const fs = pickBy(identity, filters); // make sure we are only dealing with actual values
  const selectedFilters = keys(fs); // get the keys of all the currently set filters

  const availableFilters = keys(filterFunctions);

  const appliedFilters = intersection(selectedFilters, availableFilters); // make sure we only apply existing filters

  const funcs = map(
    k => partial(filterFunctions[k], [fs[k]]), // apply the currently set value of the filter to the filter function
    appliedFilters
  );

  return pipe(...funcs)(units); // pipe the supplied units through the filter functions
});

export default {
  filterFunctions,
  applyFilters,
  sorts
};
