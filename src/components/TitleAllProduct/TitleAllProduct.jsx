import React from 'react';
import { motion } from "motion/react";

import bg1 from "/assets/backgrounds/veg-bg1.jpg";

const TitleAllProduct = () => {
    return (
        <div className="relative w-full h-32 md:h-64 rounded-3xl overflow-hidden">
                <img
                    src={bg1}
                    alt="Fresh Vegetables"
                    className="w-full h-full object-cover rounded-3xl opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.h2
                        className="text-white text-4xl md:text-5xl lg:text-8xl  font-bold drop-shadow-lg"
                        animate={{
                            textShadow: [
                                "0px 0px 0px #ffffff",
                                "0px 0px 10px #ffffff",
                                "0px 0px 0px #ffffff",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <span className="text-primary">Fresh</span> From{" "}
                        <span className="text-primary">Farm</span>
                    </motion.h2>
                </div>
            </div>
    );
};

export default TitleAllProduct;