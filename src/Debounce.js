export const Debounce = (fn, timer) => {
  let id = null;

  return function () {
    if (id) {
      clearTimeout(id);
      id = null;
    }
    id = setTimeout(() => fn(), timer);
  };
};
