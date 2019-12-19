
let timeout = null;
// todo replace this with lodash debounce.
export const timeMeOut = (func, time = 500) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    func();
  }, time);
};

export default {timeMeOut};
