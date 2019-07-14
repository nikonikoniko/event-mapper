import {filter, isEmpty, intersection, getOr} from 'lodash/fp';


export const filters = {
  tags: (tagsArray, us) => (isEmpty(tagsArray) ? us : filter(u => !isEmpty(intersection(tagsArray, getOr([], 'tags', u))))(us)),
  term: (term, us) => {
    console.log('searching is cool');
    return (isEmpty(term) ? us : filter(u => u.id.includes(term))(us));
  },

};

export const sorts = {

};

export const buttons = ['manufacturer', 'pattern-maker', 'GOTS', 'fair-trade', 'cotton'];

export default {
  filters,
  sorts
};
