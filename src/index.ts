import get from 'lodash/get';
import fetch from 'cross-fetch';
import lib from './lib';

export type Format = 'json' | 'text';
export type Response<T> = Promise<T | string | null>;
export interface HumanFileSizeConfig {
  si: boolean;
  dp: number;
  long: boolean;
}

export type Many<T> = T | ReadonlyArray<T>;
export type PropertyName = string | number | symbol;
export type PropertyPath = Many<PropertyName>;

/**
 * A function that sorts an array of objects by attribute.
 * @param {Array.<Object>} list - An array of objects to be sorted
 * @param {String} path - Path to the key to be used for sorting
 * @return {Array.<Object>} Returns the sorted list
 *
 * @see https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
 */
function sortByKey<T>(list: Array<T>, path: PropertyPath): Array<T> {
  const m = (param: any) => get(param, path);

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

/**
 * This function fetches json or text from a url.
 * Actually unnecessary but one await less.
 *
 * @note I don't catch errors, you have to do it yourself
 *
 * @param {String} url - Request object
 * @param {String} [format=json] - Request object
 * @return {Any} The format in which the response is to be returned
 */
async function basicFetch<T = any>(url: string, format: Format = 'json'): Response<T> {
  const response = await fetch(url);

  if (format === 'json') {
    return (await response.json()) as T;
  } else if (format === 'text') {
    return await response.text();
  } else {
    return null;
  }
}

/**
 * This function is very specifically designed for my needs.
 * You pass URLs to the function that lead to CSS code.
 * This text is then linked and returned.
 *
 * @note I don't catch errors, you have to do it yourself
 *
 * @param {String[]} urls - URLs directing to CSS files
 * @return {String} Returns the merged CSS code as a string
 */
async function fetchCSS(urls: string[]): Promise<string> {
  const fetcher = async (url: string) => await basicFetch(url, 'text');

  const results = await Promise.all(urls.map(fetcher));

  return results.join('\n');
}

/**
 * Format bytes as human-readable text.
 *
 * @param {Number} bytes Number of bytes.
 * @param {Object} config Config
 *
 * @return {String} Formatted string.
 *
 * @see https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 */
function humanFileSize(bytes: number, config: Partial<HumanFileSizeConfig> = {}): string {
  const {si = true, dp = 2, long = false} = config;
  const {thresh, units} = lib.humanFileSize[si ? 'si' : 'iec'];

  if (Math.abs(bytes) < thresh) return `${bytes} B`;

  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return `${bytes.toFixed(dp)} ${units[u][long ? 'long' : 'short']}`;
}

export {
  baseUrl,
  basicFetch,
  fetchCSS,
  humanFileSize,
  isIterable,
  removeEmpty,
  sortByKey,
  stringToBoolean,
};

export const iva = {
  baseUrl,
  basicFetch,
  fetchCSS,
  humanFileSize,
  isIterable,
  removeEmpty,
  sortByKey,
  stringToBoolean,
};

export default iva;
