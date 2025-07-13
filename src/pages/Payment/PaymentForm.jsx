import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {

    const stripe = useStripe()
    const elements = useElements();

    const [error, setError] = useState('');


    const handleSubmit = async(e) =>{
        e.preventDefault();


        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if(!card) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error){
            // console.log('[error]', error);
            setError(error.message);
        }
        else{
            setError('');
            console.log('[payment method]', paymentMethod);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='border rounded border-blue-200 max-w-md mt-10 p-4'>
                <CardElement className='p-4 border rounded border-gray-200'>

                </CardElement>

                {
                    error && <p className='text-red-500 mt-2 font-medium'>{error}</p>
                }

                <button className='btn w-full mt-4 bg-blue-500' type='submit' disabled={!stripe}>Pay</button>
            </form>
        </div>
    );
};

export default PaymentForm;