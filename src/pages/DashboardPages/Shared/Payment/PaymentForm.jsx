import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { productId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // console.log("product id : ", productId);

    const [error, setError] = useState("");

    const { isPending, data: productInfo = {} } = useQuery({
        queryKey: ["product", productId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${productId}`);
            return res.data;
        },
    });

    const userEmail = user?.email;
    const { data: userInfo = {} } = useQuery({
        queryKey: ["userInfo", userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail,
    });

    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    // console.log('product info : ', productInfo);
    const amount = productInfo.price;
    const productName = productInfo.itemName;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setError(error.message);
        } else {
            setError("");
            // console.log("[payment method]", paymentMethod);
        }

        // create payment intent
        const res = await axiosSecure.post("/create-payment-intent", {
            amountInCents,
            productId,
        });
        // console.log("res from intent", res);

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        });

        if (result.error) {
            // console.log(result.error.message);
            setError(result.error.message);
        } else {
            setError("");
            if (result.paymentIntent.status === "succeeded") {
                // console.log('Payment succeeded!');
                // console.log(result);
                const transactionId = result.paymentIntent.id;

                // now create payment history
                const paymentData = {
                    productId,
                    productName,
                    email: user?.email,
                    amount: amount,
                    transactionId: transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types,
                };

                const paymentRes = await axiosSecure.post(
                    "/payments",
                    paymentData
                );
                if (paymentRes.data.insertedId) {
                    // console.log('Payment successfully logged to the db.');
                    toast.success("Payment Successfully saved to DB.");

                    // create order object
                    const orderData = {
                        userEmail: userEmail,
                        orderTime: new Date().toISOString(),
                        product: productInfo,
                    };

                    try {
                        const orderRes = await axiosSecure.post(
                            "/orders",
                            orderData
                        );
                        if (orderRes.data.insertedId) {
                            toast.success("Order saved to DB successfully.");
                            navigate("/dashboard/paymentHistory");
                        } else {
                            toast.info("Order not saved to DB!!");
                        }
                    } catch (error) {
                        // console.log(error);
                        toast.error("Failed to save order!");
                    }
                }
            }
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex justify-center py-10">
                <form
                    onSubmit={handleSubmit}
                    className="border rounded border-blue-200 max-w-md mt-10 p-4 w-full"
                >
                    <h2 className="text-center font-semibold text-3xl md:text-5xl mb-10 flex justify-center items-center gap-2">
                        <span className="text-blue-500"><FaMoneyCheckDollar></FaMoneyCheckDollar></span>
                        Pay with <span className="text-blue-500">Stripe</span>
                    </h2>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Your Email
                        </label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-800 cursor-not-allowed"
                        />
                    </div>

                    <CardElement className="p-4 mt-4 border rounded border-gray-200"></CardElement>

                    {error && (
                        <p className="text-red-500 mt-2 font-medium">{error}</p>
                    )}

                    <button
                        className="btn w-full mt-4 bg-blue-500 text-white text-xl"
                        type="submit"
                        disabled={!stripe}
                    >
                        Pay $ <span>{amount}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
