import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "motion/react";
import Container from "../Container/Container";

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
        <Container>
            <div className="">
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
                    <span>Recent</span> <span>Ads</span>
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
                            <div className="relative z-0 w-full mx-auto h-full">
                                <img
                                    src={ad.image}
                                    alt={ad.title}
                                    className="w-full h-[400px] md:h-[500px] object-cover rounded"
                                />

                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <div className="bg-black/50 p-4 rounded-md max-w-xl text-center">
                                        <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                            {ad.title}
                                        </h2>
                                        <p className="text-sm md:text-base">
                                            {ad.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    );
};

export default AdsBanner;
