const express = require('express');
const cors = require('cors');
const app = express();
const { body, validationResult } = require('express-validator');
const { checkOffer } = require('./utils');
const port = 3001;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Needed cors and body parser to parse the body of the request
app.use(cors());
app.use(express.json());

// Has 2 middlware functions, one checks if the body is numeric, and one checks the offer and manipulates the request body
app.post('/offer', body('offer').isNumeric(), checkOffer, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      // Gets the offer from the request body and adds it to our DB
      const newOffer = await prisma.offer.create({
        data: {
          value: parseInt(req.body.offer),
        },
      });
      res.status(200).send({ ...req.body, newOffer });
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

app.get('/offer', async (req, res) => {
  try {
    // Gets all the offers from the DB and sends them to the client
    const offers = await prisma.offer.findMany({
      select: {
        value: true,
      },
    });
    let offerValues = offers.map((offer) => offer.value);
    res.status(200).send(offerValues);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
