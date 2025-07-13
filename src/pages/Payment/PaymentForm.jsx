import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const PaymentForm = () => {

    const stripe = useStripe()
    const elements = useElements();


    const handleSubmit = e =>{
        e.preventDefault();


        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if(!card) {
            return;
        }
    }

    return (
        <div className='bg-blue-50 max-w-xl p-8 border border-blue-100 rounded-2xl m-10'>
            <form onSubmit={handleSubmit}>
                <CardElement>

                </CardElement>

                <button className='btn w-full mt-4' type='submit' disabled={!stripe}>Pay</button>
            </form>
        </div>
    );
};

export default PaymentForm;