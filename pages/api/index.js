import Stripe from "stripe"
const stripeCTRL = new Stripe("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",{
  apiVersion: "2022-08-01",
})

export default async function handler(req, res) {
if(req.method !== "POST"){
  res.status(400).json({message:'invalid request type'})
}

   let {amount}= req.body
  try {
    const paymentIntent = await stripeCTRL.paymentIntents.create({
      payment_method_types: ["card"],
      amount: amount,
      currency: "NGN",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      nextAction: paymentIntent.next_action,
    });
  } catch (error) {
      res.status(200).json({error})
  }
}
