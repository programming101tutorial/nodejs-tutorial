const sumController = require('../controllers/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sumController.sum(1, 2)).toBe(3);
});