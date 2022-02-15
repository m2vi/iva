import {removeEmpty} from '../src';

test('removeEmpty', () => {
  expect(removeEmpty({foo: undefined, bar: 'foo'})).toEqual({
    bar: 'foo',
  });
  expect(removeEmpty({foo: null, bar: 'foo'})).toEqual({
    foo: null,
    bar: 'foo',
  });
});
