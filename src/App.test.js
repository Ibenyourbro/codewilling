const { checkOffer } = require('../server/utils');

// This is the test suite for the checkOffer function
test('checkOffer function should manipulate req.body', () => {
  const req = {
    body: {
      offer: 80000,
    },
  };
  checkOffer(req, null, () => {});
  expect(req.body.response).toBe('Deal!');
});

test('checkOffer function should give response if offer is between 50000 and 60000', () => {
  const req = {
    body: {
      offer: 55000,
    },
  };
  checkOffer(req, null, () => {});
  expect(req.body.response).toBe('I can come down to  ');
});
//Could add more tests here to check for other responses
