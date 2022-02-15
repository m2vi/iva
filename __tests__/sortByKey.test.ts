import {sortByKey} from '../src';

test('sortByKey', () => {
  expect(sortByKey([{count: 20}, {count: 1}], 'count')).toEqual([
    {count: 1},
    {count: 20},
  ]);
});
