const express = require('express');
const cors = require('cors');
const app = express();
const { body, validationResult } = require('express-validator');
const { checkOffer } = require('./utils');
const port = 3001;
//Needed cors and body parser to parse the body of the request
app.use(cors());
app.use(express.json());

// Has 2 middlware functions, one checks if the body is numeric, and one checks the offer and manipulates the request body
app.post('/offer', body('offer').isNumeric(), checkOffer, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    res.status(200).send(req.body);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
