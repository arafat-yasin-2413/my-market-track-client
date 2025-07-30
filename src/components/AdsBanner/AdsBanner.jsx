import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "motion/react";

const AdsBanner = () => {
    const axiosSecure = useAxiosSecure();

    const { data: ads = [], isLoading } = useQuery({
        queryKey: ["approvedAds"],
        queryFn: async () => {
            const res = await axiosSecure.get("/approvedAds");
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="mb-10">
            <motion.h2
                className="text-white text-center my-6 text-4xl md:text-5xl lg:text-8xl  font-bold drop-shadow-lg"
                animate={{
                    textShadow: [
                        "0px 0px 0px #22c55e",
                        "0px 0px 10px #22c55e",
                        "0px 0px 0px #22c55e",
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <span>Ads</span>{" "}
                <span>Section</span>
            </motion.h2>

            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                Navigation
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                speed={600}
                className="h-full rounded"
            >
                {ads.map((ad, index) => (
                    <SwiperSlide key={ad._id || index}>
                        <div className="relative w-1/2 mx-auto h-full">
                            <img
                                src={ad.image}
                                alt={ad.title}
                                className="w-full h-[400px] md:h-[500px] object-cover rounded"
                            />
                            <div className="absolute top-1/3 md:left-12 text-white bg-black/50 p-4 rounded-md max-w-2xl">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                    {ad.title}
                                </h2>
                                <p className="text-sm md:text-base">
                                    {ad.description}
                                </p>
                                
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AdsBanner;
