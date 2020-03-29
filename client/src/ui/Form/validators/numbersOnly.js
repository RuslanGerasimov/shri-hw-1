export default (value) => {
  if(typeof value !== 'string') {
    value = value.toString();
  }
  return !value || value.match(/^\d+$/);
};