import React from 'react'
import styled from 'styled-components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const Card = styled.div`
    width: 400px;
    height: 520px;
    padding: 2rem;
    background-color: #ffffff;
    box-shadow: 1px 1px 20px 0px #b5c4f74d;
    border-radius: 15px;
  
`;


function PaymentCard() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        let email = data.get('email')
        let phone = data.get('phone')
        let amount = data.get('amount')


        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            alert('Stripe.js has not yet loaded.');
            return;
        }
        const { clientSecret } = await fetch("http://localhost:3000/api", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: parseInt(amount) * 100,
            }),
        }).then(res => res.json())


        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: email,
                        phone: phone
                    },
                },
            }
        );

        if (stripeError) {
            // Show error to your customer (e.g., insufficient funds)
            alert(stripeError.message);
            return;
        }
        alert(paymentIntent.status)
    }
    return (
        <Card>
            <form action="" onSubmit={handleSubmit} >
                <h3 style={{ textAlign: "center", marginBottom: "50px" }} >VALYKA PAYMENT PORTAL</h3>
                <label style={{ fontWeight: "bold", marginBottom: 2 }} htmlFor="email">Email Address</label>
                <Input type="email" name="email" id="email" />
                <br />
                <label style={{ fontWeight: "bold", marginBottom: 2 }} htmlFor="phone">Phone Number</label>
                <Input type="email" name="email" id="phone" />
                <br />
                <label style={{ fontWeight: "bold", marginBottom: 2 }} htmlFor="amount">Amount</label>
                <Input type="amount" name="amount" id="amount" />
                <label style={{ fontWeight: "bold", marginBottom: 2 }} htmlFor="card">Card Details</label>
                <div style={{
                    height: "30px",
                    paddingTop: "10px",
                    backgroundColor: "#f7eef7"
                }} >
                    <CardElement o id='card' />
                </div>

                <Pay type="submit">Pay</Pay>

            </form>
        </Card>
    )
}

export default PaymentCard

const Pay = styled.button`
    background-color: purple;
    color: aliceblue;
    border-style:none;
    border-radius: 4px;
    width: 100%;
    height:30px;
    font-size:18px;
    margin-top: 12px;
   :hover:{
    background-color: #f3d5f3;
   }

`
const Input = styled.input`
    background-color: #f7eef7;
    border-style:none;
    border-radius: 4px;
    width: 100%;
    height:30px;
    font-size:24px;
    margin:1rem auto;
   :hover:{
    background-color: #f3d5f3;
   }

`