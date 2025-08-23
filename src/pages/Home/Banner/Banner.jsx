import React from "react";
import { motion } from "framer-motion";
import banner4 from "/assets/banner/banner-4.jpg";
import { Link } from "react-router";
import Container from "../../../components/Container/Container";

const Banner = () => {
    return (
        <Container>
            <div className="relative w-full h-[50vh] xl:h-[60vh] rounded-2xl">
                <img
                    src={banner4}
                    alt="Market Banner"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/50 rounded-2xl" />

                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-10 lg:top-20 left-1/2 transform -translate-x-1/2 text-center text-white px-1 md:px-4"
                >
                    <motion.h1
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
                        className="text-2xl md:text-3xl xl:text-4xl font-bold drop-shadow-lg leading-tight"
                    >
                        Track Every Market Move,
                        <br className="hidden md:block" />
                        Stay Ahead with Confidence
                    </motion.h1>
                    <p className="mt-4 text-md md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-sm">
                        MarketTrack empowers you with real-time data, trends,
                        and insights — everything you need to make smarter
                        investment decisions.
                    </p>
                    <Link to="/allProduct">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 bg-accent hover:bg-accent/90 text-white px-3 py-1 md:px-6 md:py-3 rounded text-base  md:text-lg font-semibold shadow cursor-pointer"
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </Container>
    );
};

export default Banner;
