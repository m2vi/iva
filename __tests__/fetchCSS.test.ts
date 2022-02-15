import {fetchCSS} from '../src';

test('fetchCSS and basicFetch', (done) => {
  // dumb example
  fetchCSS([
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
  ])
    .then((data) => {
      expect(data).toBeDefined();
      done();
    })
    .catch(done);
});
