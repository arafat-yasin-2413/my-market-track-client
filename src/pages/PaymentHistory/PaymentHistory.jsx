import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { MdPayment } from "react-icons/md";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-center justify-center">
                <MdPayment className="text-blue-600" />
                Payment History
            </h2>

            {payments.length === 0 ? (
                <p className="text-center text-gray-500">
                    No payment history found.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    SL
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Transaction ID
                                </th>
                                
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Product Name
                                </th>



                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Product ID
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Amount
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Paid At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payments.map((payment, index) => (
                                <tr
                                    key={payment._id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {index + 1}
                                    </td>

                                    <td
                                        className="px-4 py-3 text-sm text-blue-700"
                                        title={payment.transactionId}
                                    >
                                        {payment.transactionId}
                                    </td>
                                    
                                    <td
                                        className="px-4 py-3 text-sm"
                                        title={payment.productName}
                                    >
                                        {payment.productName}
                                    </td>

                                    <td
                                        className="px-4 py-3 text-sm text-gray-700"
                                        title={payment.productId}
                                    >
                                        {payment.productId}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-green-600 font-semibold">
                                        ${payment.amount}
                                    </td>

                                    <td
                                        className="px-4 py-3 text-sm text-gray-700"
                                        title={new Date(
                                            payment.paidAt
                                        ).toString()}
                                    >
                                        {new Date(
                                            payment.paidAt
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            payment.paidAt
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
