import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl mx-auto mt-16 p-10 bg-white rounded-xl shadow-xl"
            >
                <motion.h1
                    className="text-4xl font-bold text-center text-primary mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    About <span className="text-accent">Market Track</span>
                </motion.h1>

                <motion.p
                    className="text-lg text-gray-700 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    <span className="text-accent">MarketTrack</span> is a cutting-edge platform designed to provide
                    real-time insights, product tracking, and analytics across
                    multiple marketplaces. With a focus on transparency and
                    data-driven decisions, we empower users to stay ahead in the
                    competitive market. Our dedicated team combines technology
                    and market expertise to deliver a seamless experience for
                    businesses and consumers alike.
                </motion.p>
            </motion.div>
        </div>
    );
};

export default AboutUs;
