const express = require("express");

const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment/stripe", (req, res) => {
  console.log(req.body);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "gbp",
    },
    (stripeError, stripeRes) => {
      if (stripeError) {
        console.log(stripeError);
        res.status(400).json(stripeError);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
