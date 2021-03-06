import curry from 'lodash/curry';

/**
 * A collection of util functions on `Immutable.js` iterables
 */
const IterableFunctions = {

  /**
   * Checks if the iterable is equal to a value
   */
  equals: curry((value, iterable) => {
    return value === iterable;
  }),

  /**
   * Gets a key from an Immmutable.js iterable
   */
  get: curry((key, predicate) => {
    return predicate.get(key);
  }),

  isNull(value) {
    return value === null;
  },

  /**
   * Returns whether or not an attribute on an iterable is truthy
   * @param  {*} value            - The attribute being tested
   * @return {Boolean}            - Whether or not the value is true or false
   */
  isTruthy(value) {
    return Boolean(value);
  },

  /**
   * Returns if an attribute on the predicate matches a given value or not
   * @param  {String} attr                          - The name of the attribute on the predicate
   * @param  {String|Boolean|Number|RegExp} matcher - The value we're trying to match
   * @param  {Immutable.Map} predicate              - The predicate we're trying to match
   * @return {Boolean}                              - Whether or not the attribute on the predicate matches the matcher
   */
  matchesAttr: curry((attr, matcher, predicate) => {
    if (!predicate.has(attr)) return false;

    if (matcher.constructor === RegExp) return matcher.test(predicate.get(attr));
    return predicate.get(attr) === matcher;
  }),
  
};

export default IterableFunctions;