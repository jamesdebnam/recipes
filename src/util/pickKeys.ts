/**
 * Picks keys out of an object, returning a new object
 */
export default (object: { [key: string]: any }, keys: string[]) => {
  return keys.reduce((obj: { [key: string]: any }, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
