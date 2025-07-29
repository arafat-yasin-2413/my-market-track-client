import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { HiSpeakerphone } from "react-icons/hi";
import { FaToggleOn, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllAdvertisement = () => {
    const axiosSecure = useAxiosSecure();
    const [openStatusId, setOpenStatusId] = useState(null);

    const {
        data: allAds = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["all-ads"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allAds");
            return res.data;
        },
    });

    const handleChangeStatus = async (ad, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/ads/status/${ad._id}`, {
                status: newStatus,
            });
            if (res.data.modifiedCount > 0) {
                toast.success(`Status changed to ${newStatus}`);
                refetch();
                setOpenStatusId(null);
            }
        } catch (error) {
            console.error("Status update failed:", error);
            toast.error("Failed to update status");
        }
    };

    const statusOptions = ["pending", "approved", "rejected"];

    const handleDeleteAd = (ad) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(
                        `/ads/delete/${ad._id}`
                    );
                    if (res.data.deletedCount > 0) {
                        toast.success("Ad deleted successfully");
                        refetch();
                    }
                } catch (error) {
                    console.error("Delete failed:", error);
                    toast.error("Failed to delete the ad");
                }
            }
        });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-6 flex justify-center items-center gap-2">
                <HiSpeakerphone />
                All Advertisements
            </h2>

            {allAds.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300 rounded-lg">
                        <thead className="bg-gray-200">
                            <tr className="text-center text-gray-700 text-sm">
                                <th className="py-3 px-4">SL</th>
                                <th className="px-4 py-3">Ad Title</th>
                                <th className="px-4 py-3">Ad Image</th>
                                <th className="px-4 py-3">Vendor Email</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAds.map((ad, index) => {
                                const filteredStatusOptions =
                                    statusOptions.filter(
                                        (status) => status !== ad.status
                                    );
                                return (
                                    <tr
                                        key={ad._id}
                                        className="text-center text-sm hover:bg-gray-100 transition duration-200"
                                    >
                                        <td className="py-3 px-4 align-middle text-base">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-3 align-middle font-medium">
                                            {ad.title}
                                        </td>
                                        <td className="px-4 py-3 align-middle">
                                            <img
                                                src={ad.image}
                                                alt="Ad"
                                                className="w-20 h-12 object-cover mx-auto rounded-md"
                                            />
                                        </td>
                                        <td className="px-4 py-3 align-middle">
                                            {ad.email}
                                        </td>
                                        <td className="px-4 py-3 align-middle capitalize">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    ad.status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : ad.status ===
                                                          "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {ad.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-middle flex justify-center gap-4 text-lg relative">
                                            <div className="relative flex justify-center items-center">
                                                <button
                                                    title="Change Status"
                                                    className="text-green-600 hover:text-green-800 btn"
                                                    onClick={() =>
                                                        setOpenStatusId(
                                                            openStatusId ===
                                                                ad._id
                                                                ? null
                                                                : ad._id
                                                        )
                                                    }
                                                >
                                                    <FaToggleOn />
                                                </button>
                                                {openStatusId === ad._id && (
                                                    <div className="absolute z-20 bg-white border border-gray-300 rounded-md mt-2 shadow-md w-36 right-0">
                                                        {filteredStatusOptions.map(
                                                            (option) => (
                                                                <button
                                                                    key={option}
                                                                    onClick={() =>
                                                                        handleChangeStatus(
                                                                            ad,
                                                                            option
                                                                        )
                                                                    }
                                                                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                                                >
                                                                    Set as{" "}
                                                                    {option}
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                title="Delete Ad"
                                                className="text-red-600 hover:text-red-800 btn"
                                                onClick={() =>
                                                    handleDeleteAd(ad)
                                                }
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-2xl my-6">No Ads to Show</p>
            )}
        </div>
    );
};

export default AllAdvertisement;
