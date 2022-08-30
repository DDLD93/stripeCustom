import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';




const Card = styled.div`
    width: 400px;
    height: 510px;
    padding: 2rem;
    background-color: #ffffff;
    box-shadow: 1px 1px 20px 0px #b5c4f74d;
    border-radius: 15px;
  
`;


function PaymentCard() {
    const stripe = useStripe();
    const elements = useElements();
    const [disabled, setdisabled] = useState(false)

    const handleSubmit = async (e) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        e.preventDefault();
        setdisabled(true)
        const data = new FormData(e.currentTarget);

        let email = data.get('email')
        let phone = data.get('phone')
        let amount = data.get('amount')


        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            setdisabled(false)
            alert('Stripe.js has not yet loaded.');
            return;
        }
        const { clientSecret } = await fetch("/api", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: parseInt(amount) * 100,
            }),
        }).then(res => res.json()).catch(err => console.log(err))
        if (!clientSecret)  {
            alert("something went make sure you connected to internet");
            setdisabled(false)
            return
        }

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
            setdisabled(true)
            alert(stripeError.message);
            return;
        }
        alert(paymentIntent.status)
        

      
    }
   
    return (
       
        <Card>
            <form action="" onSubmit={handleSubmit} >
                <h3 style={{ textAlign: "center", marginBottom: "30px" }} >PAYMENT PORTAL</h3>
                <label style={{ fontWeight: "bold", marginBottom: 2 }} htmlFor="email">Email Address</label>
                <Input type="email" name="email" id="email" />
                <br />
                <label style={{ fontWeight: "bold", marginBottom: 2 }} htmlFor="phone">Phone Number</label>
                <Input type="text" name="phone" id="phone" />
                <br />
                <label style={{ fontWeight: "bold", marginBottom: 2 }} htmlFor="amount">Amount</label>
                <Input type="amount" name="amount" id="amount" />
                <label style={{ fontWeight: "bold", marginBottom: 5 }} htmlFor="card">Card Details</label>
                <div style={{
                    height: "35px",
                    marginTop: "7px",
                    padding: "12px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#f7eef7"
                }} >
                    <CardElement o id='card' />
                </div>
                <LoadingButton
                    size="small"
                    endIcon={<SendIcon />}
                    loading={disabled}
                    disableElevation
                    fullWidth
                    sx={{
                        marginTop:"17px"
                    }}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                >
                    Pay
                </LoadingButton>
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
    height:38px;
    font-size:18px;
    margin-top: 20px;
    &:hover {
        transition-delay:100ms;
        transition-duration:300ms;
        background-color: #68026b;
    };
    :active{
        width: 99.9%;
    height:37/9px;
        background-color: #0f040f;

    }

`
const Input = styled.input`
    background-color: #f7eef7;
    border-style:none;
    border-radius: 4px;
    padding: 6px 7px;
    width: 100%;
    height:30px;
    font-size:18px;
    margin:1rem auto;
    &:focus-visible{
        border-style:none;
        outline: none;
    }

`