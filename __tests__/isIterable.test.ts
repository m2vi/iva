import {isIterable} from '../src';

test('isIterable', () => {
  expect(isIterable(null)).toBe(false);
  expect(isIterable([])).toBe(true);
});
