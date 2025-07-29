import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUsers, FaShoppingCart, FaStore } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

const stats = [
    { icon: <FaUsers />, label: "Happy Customers", count: 10000 },
    { icon: <FaShoppingCart />, label: "Orders Delivered", count: 50000 },
    { icon: <FaStore />, label: "Trusted Vendors", count: 200 },
];

const SocialProof = () => {
    return (
        <div>
            <motion.section
                className="p-6 max-w-4xl mx-auto"
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
                                        <MdBarChart></MdBarChart>
                                    </motion.span>
                                    Social Proof
                                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-base-100 shadow-md p-6 rounded-xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="text-3xl text-primary mb-2 mx-auto">
                                {stat.icon}
                            </div>
                            <h3 className="text-2xl font-semibold">
                                <CountUp
                                    end={stat.count}
                                    duration={6}
                                    separator=","
                                />
                                +
                            </h3>
                            <p className="text-gray-600">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default SocialProof;
