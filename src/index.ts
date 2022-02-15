import lodash, {PropertyPath} from 'lodash';

/**
 * A function that sorts an array of objects by attribute.
 * @param {Array.<Object>} list - An array of objects to be sorted
 * @param {String} path - Path to the key to be used for sorting
 * @return {Array.<Object>} Returns the sorted list
 *
 * @see https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
 */
function sortByKey<T>(list: Array<T>, path: PropertyPath): Array<T> {
  const m = (param: any) => lodash.get(param, path);

  return list.sort((a, b) => {
    return m(a) > m(b) ? 1 : m(b) > m(a) ? -1 : 0;
  });
}

/**
 * Object, array, ... is checked for iterability.
 * @param {Object} obj - Something that is to be checked for iterability
 * @return {Boolean} Returns a boolean indicating whether obj is iterable
 *
 * @see https://stackoverflow.com/questions/18884249/checking-whether-something-is-iterable
 */
function isIterable<T>(obj: T): Boolean {
  return obj != null && Symbol.iterator in Object(obj);
}

/**
 * A function that takes a boolean string and returns a boolean
 * @param {String} str - A boolean string
 * @return {Boolean} Returns a boolean
 *
 * @see https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
 */
function stringToBoolean(str: string): Boolean {
  switch (str.toLowerCase().trim()) {
    case '1':
    case 'true':
    case 'yes':
      return true;

    case '0':
    case 'false':
    case 'no':
    case null:
      return false;

    default:
      return Boolean(str);
  }
}

/**
 * A function that removes undefined fields from an object
 * @param {Object} obj - An object with undefined fields
 * @return {Object} Returns object without undefined fields
 *
 * @see https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
 */
function removeEmpty<T>(obj: T): T {
  const newObj: any = {};

  Object.entries(obj).forEach(([k, v]: [string, any]) => {
    if (v === undefined) return;
    newObj[k] = v;
  });

  return newObj;
}

/**
 * A function that removes undefined fields from an object
 * @param {Object} req - Request object
 * @return {String} Returns a valid url
 *
 * @see https://stackoverflow.com/questions/25203124/how-to-get-base-url-with-jquery-or-javascript
 */
function baseUrl(req: any): string {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = req ? `${protocol}://${req.headers.host}` : '';

  return baseUrl;
}

// Is this dumb?
export {sortByKey, isIterable, stringToBoolean, removeEmpty, baseUrl};
const iva = {sortByKey, isIterable, stringToBoolean, removeEmpty, baseUrl};
export default iva;
