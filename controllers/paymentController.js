const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51KqsYOEB6Tsc76QKv4seNpb3f81k14ceL2LfH6mkmvlaM2UwpIDEyCjP2Ce9x6o2uNDBBzlA1Zqx9Y9Z9u5vwXMq00D8B6T7Oz"
);

exports.processStripePayment = catchAsyncErrors(async (req, res, next) => {
  const { tokenId,amount } = req.body;

  stripe.charges.create({
    source:tokenId,
    amount:amount,
    currency:"usd"

  },(stripeErr,stripeRes)=>{
    if(stripeErr){
      res.status(500).json(stripeErr)
    }else{
      res.status(200).json(stripeRes)
    }

  })



  
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});



exports.sendPaypalApiKey=catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ paypalApiKey: process.env.PAYPAL_CLIENT_ID });
});
