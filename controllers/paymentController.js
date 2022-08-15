const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51LGbroCg9ADniRXPLtYCfoDEdTZzlZOlWnxFpun9KzVzPioSQNve5gYNfv7AZUsqBTFIxyPeq2BtMMcDFYSY6utp00myvjPzLw"
);

exports.processStripePayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount * 100,
    currency: "eur",
    payment_method_types: ["card"],
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

exports.sendPaypalApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ paypalApiKey: process.env.PAYPAL_CLIENT_ID });
});