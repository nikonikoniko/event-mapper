/* global locale */
import basic from './translations.json';

const ll = locale || 'en';


const translations = basic;

const t = (s, l = ll) => {
  try {
    return translations[l][s.toLowerCase()] ? translations[l][s.toLowerCase()] : s;
  } catch (e) {
    return s;
  }
};
export default t;
