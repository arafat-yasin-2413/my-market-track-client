import React from "react";
import {
    FaAppleAlt,
    FaBoxes,
    FaCarrot,
    FaCheckCircle,
    FaClock,
    FaFireAlt,
    FaLeaf,
    FaRecycle,
    FaSmile,
    FaSnowflake,
    FaThermometerHalf,
    FaTint,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { MdTipsAndUpdates } from "react-icons/md";

const tips = [
    {
        icon: <FaLeaf />,
        text: "Wash leafy greens in salt water to remove pesticides.",
    },
    {
        icon: <FaClock />,
        text: "Buy fish early morning for maximum freshness.",
    },
    {
        icon: <FaSnowflake />,
        text: "Store meat below 5°C to prevent spoilage.",
    },
    {
        icon: <FaCheckCircle />,
        text: "Always check for bruises before buying fruits.",
    },
    {
        icon: <FaFireAlt />,
        text: "Use low flame to preserve nutrients in vegetables.",
    },
    {
        icon: <FaCarrot />,
        text: "Avoid peeling carrots to keep the fiber intact.",
    },
    {
        icon: <FaRecycle />,
        text: "Compost vegetable waste to reuse as fertilizer.",
    },
    {
        icon: <FaTint />,
        text: "Soak pulses for 4-6 hours before cooking for better digestion.",
    },
    {
        icon: <FaAppleAlt />,
        text: "Apples should be stored in a cool, dark place.",
    },
    { icon: <FaSmile />, text: "Happy cooking starts with fresh ingredients!" },
    {
        icon: <FaBoxes />,
        text: "Store onions and potatoes separately to avoid spoilage.",
    },
    {
        icon: <FaThermometerHalf />,
        text: "Don’t refrigerate tomatoes – keep them at room temperature.",
    },
];

const MarketTips = () => {
    return (
        <div>
            <motion.section
                className="p-6 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <motion.h2
                    className="text-5xl font-bold mb-6 text-center flex justify-center items-center gap-2"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <motion.span
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-yellow-500"
                    >
                        <MdTipsAndUpdates />
                    </motion.span>
                    Quick Market Tips
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tips.map((tip, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start bg-base-100 shadow-md p-4 rounded-xl gap-3"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="text-primary text-xl">
                                {tip.icon}
                            </div>
                            <p className="text-base text-gray-700">
                                {tip.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default MarketTips;
