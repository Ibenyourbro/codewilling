const checkOffer = (req, res, next) => {
  // 😉
  const idealOffer = 80000;
  const { offer } = req.body;
  // we check the offer against multiple conditions and manipulate the body of the request based on the offer
  if (offer >= idealOffer) {
    req.body.response = 'Deal!';
  }
  if (offer <= 0) {
    req.body.response = "Comeon man, you can't be serious!!";
  }
  if (offer <= 50000 && offer > 0) {
    req.body.response =
      "That's a little lower than I expected. I was thinking more around $70,000 - $90,000";
  }
  if (offer <= 60000 && offer > 50000) {
    req.body.response = 'I can come down to  ';
    req.body.counterOffer = 85000;
  }
  if (offer <= 70000 && offer > 60000) {
    req.body.response = 'We are super close, what about ';
    req.body.counterOffer = 83000;
  }
  if (offer <= 79999 && offer > 70000) {
    req.body.response =
      'I would love to work at CodeWilling, bump it up to 80,000 and we have a deal!';
  }

  next();
};

module.exports = { checkOffer };
