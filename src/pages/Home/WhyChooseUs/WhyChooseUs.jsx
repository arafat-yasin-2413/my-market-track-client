import React from "react";
import { FiZap, FiBarChart2, FiLock, FiDollarSign } from "react-icons/fi";
import Container from "../../../components/Container/Container";

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: FiZap,
            title: "Easy to Use",
            desc: "Clean, simple UI—no steep learning curve.",
        },
        {
            icon: FiBarChart2,
            title: "Real-Time Insights",
            desc: "Up-to-date sales metrics at a glance.",
        },
        {
            icon: FiLock,
            title: "Secure Payments",
            desc: "Stripe ensures fast and safe transactions.",
        },
        {
            icon: FiDollarSign,
            title: "Affordable Plans",
            desc: "Flexible pricing for any business size.",
        },
    ];

    return (
        <Container>
            <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Why Choose MarketTrack
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {reasons.map(({ icon: Icon, title, desc }, i) => (
                        <div key={i} className="bg-white rounded-xl border p-5 flex flex-col justify-center items-center">
                            <Icon className="w-8 h-8" />
                            <h3 className="mt-3 font-semibold text-lg">
                                {title}
                            </h3>
                            <p className="text-sm opacity-80 mt-1">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default WhyChooseUs;
