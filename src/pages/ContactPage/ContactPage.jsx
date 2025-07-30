import React from "react";
import { motion } from "framer-motion";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const ContactPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-3xl mx-auto my-16 p-8 bg-white rounded-xl shadow-xl"
            >
                <motion.h1
                    className="text-4xl font-bold mb-6 text-center text-blue-600"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Contact Us
                </motion.h1>

                <div className="space-y-6 text-lg text-gray-700">
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <MdLocationOn className="text-blue-500 text-2xl" />
                        <span>
                            123 Gulshan Avenue, Floor 5, Gulshan-2, Dhaka 1212,
                            Bangladesh
                        </span>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <MdPhone className="text-blue-500 text-2xl" />
                        <span>+880 1711-123456</span>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <MdEmail className="text-blue-500 text-2xl" />
                        <span>contact@markettrack.com</span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;
