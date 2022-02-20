import {humanFileSize} from '../src';

test('humanFileSize', () => {
  expect(humanFileSize(994662584320)).toEqual('994.66 GB');
});
