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
import Container from "../Container/Container";
import MainTitle from "../MainTitle/MainTitle";

const tips = [
    {
        icon: <FaLeaf />,
        text: "Always wash leafy greens in salt water thoroughly to remove any pesticides or dirt.",
    },
    {
        icon: <FaClock />,
        text: "Buy fresh fish early in the morning to ensure maximum freshness and better taste.",
    },
    {
        icon: <FaSnowflake />,
        text: "Store all kinds of meat below 5°C in the refrigerator to prevent spoilage safely.",
    },
    {
        icon: <FaCheckCircle />,
        text: "Always check fruits carefully for bruises, blemishes, or any damage before purchasing them.",
    },
    {
        icon: <FaFireAlt />,
        text: "Use a low flame while cooking vegetables to preserve their nutrients and natural flavors.",
    },
    {
        icon: <FaCarrot />,
        text: "Avoid peeling carrots to keep all the fiber and nutrients intact for healthier meals.",
    },
    {
        icon: <FaRecycle />,
        text: "Compost vegetable and kitchen waste properly to reuse it later as natural fertilizer for plants.",
    },
    {
        icon: <FaTint />,
        text: "Soak pulses and lentils for 4-6 hours before cooking to improve digestion and taste.",
    },
    {
        icon: <FaAppleAlt />,
        text: "Store apples in a cool, dark, and dry place to maintain their freshness longer.",
    },
    {
        icon: <FaSmile />,
        text: "Happy cooking always starts with fresh ingredients following preparation steps carefully.",
    },
    {
        icon: <FaBoxes />,
        text: "Store onions and potatoes separately in a dry place to avoid spoilage and sprouting quickly.",
    },
    {
        icon: <FaThermometerHalf />,
        text: "Do not refrigerate tomatoes; keep them at room temperature to retain flavor and texture.",
    },
];



const MarketTips = () => {
    return (
        <Container>
            <div>
                <motion.section
                    className="w-full mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* <motion.h2
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
                    </motion.h2> */}

                    

                    <MainTitle text={"Quick Market Tips"}></MainTitle>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tips.map((tip, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start bg-base-100 shadow-md p-4 rounded-xl gap-3"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="text-accent text-xl">
                                    {tip.icon}
                                </div>
                                <p className="text-base text-gray-700 font-semibold">
                                    {tip.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </Container>
    );
};

export default MarketTips;
