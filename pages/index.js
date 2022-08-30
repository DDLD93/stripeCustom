import Head from 'next/head'
import React, { useState,useEffect } from 'react'
import styles from '../styles/Home.module.css'
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import PaymentCard from '../component/paymentCard';
import LoadingOverlay from "react-loading-overlay";
const DarkBackground = styled.div`
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  display:${props => props.disappear? "block":"none"}; /* show */
`;


export default function Home() {
 const stripePromise = loadStripe('pk_live_51KOKIRKY8d3kVyC69pFX9HNmQW1HdvoVSPyw0iv14OFHSuCfi38IoVMD0LjNainSfDQ9PBVxSObnuRFSTBPQmrqW00D444frpP');
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  

      <Elements stripe={stripePromise}>
     <PaymentCard/>
      </Elements>
 
    </div>
  )
}
