import dotenv from "dotenv";
dotenv.config();

import a from "stripe";
const stripe = a(process.env.STRIPE);

class paymentClass {
  constructor() {}

  static Stripe = async (req, res) => {

    try {
      stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: req.body.amount,
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            res.send({ success: true, message: "hello" });
          } else {
            res.status(200).json(stripeRes);
          }
        }
      );
    } catch (error) {
      res.status(404).json();
    }
  };
}

export default paymentClass;
