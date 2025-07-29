import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import banner1 from "/assets/banner/banner-1.jpg";
import banner2 from "/assets/banner/banner-2.jpg";
import banner3 from "/assets/banner/banner-3.jpg";

const Test = () => {
    return (
        <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                
            }}
            pagination= {{ clickable: true }}
            speed={600}
            className="h-full rounded"
        >
            {/* Slide 1 */}
            <SwiperSlide>
                <div className="relative w-full h-full">
                    <img src={banner1} className="w-full h-full object-cover" />
                    <div className="absolute top-1/3 left-10 text-white">
                        <h2 className="text-4xl font-bold">
                            Welcome to Our Store slide 1
                        </h2>
                        <p className="mt-2">Find your favorite items today.</p>
                        <button className="mt-4 bg-blue-600 px-6 py-2 rounded">
                            Shop Now
                        </button>
                    </div>
                </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
                <div className="relative w-full h-full">
                    <img src={banner2} className="w-full h-full object-cover" />
                    <div className="absolute top-1/3 left-10 text-white">
                        <h2 className="text-4xl font-bold">
                            Best Deals Everyday slide 2
                        </h2>
                        <button className="mt-4 bg-green-600 px-6 py-2 rounded">
                            See Offers
                        </button>
                    </div>
                </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
                <div className="relative w-full h-full">
                    <img src={banner3} className="w-full h-full object-cover" />
                    <div className="absolute top-1/3 left-10 text-white">
                        <h2 className="text-4xl font-bold">
                            this is slide 3
                        </h2>
                        <button className="mt-4 bg-green-600 px-6 py-2 rounded">
                            See Offers
                        </button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Test;
