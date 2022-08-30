import Stripe from "stripe"
const stripeCTRL = new Stripe("sk_test_51JW2AbE8Ae2Mwo9GA97HpTwWjmbgnir2gLdcqp27KbK4mlX7XtFffXKks4210BHE68lYz04CtlhmN0LOWtnny1jB00SmEJybjE",{
  apiVersion: "2022-08-01",
})

export default async function handler(req, res) {
if(req.method !== "POST"){
  req.status(400).json({message:'invalid request type'})
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
