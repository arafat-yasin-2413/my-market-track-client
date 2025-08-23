import React from "react";
import { FiZap, FiBarChart2, FiLock, FiDollarSign } from "react-icons/fi";
import Container from "../../../components/Container/Container";
import MainTitle from "../../../components/MainTitle/MainTitle";

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

const WhyChooseUs = () => {

    return (
        <Container>
            <section>
                <MainTitle text={"Why Choose Us"}></MainTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {reasons.map(({ icon: Icon, title, desc }, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 px-5 py-10 flex flex-col justify-center items-center hover:scale-105 transition duration-200">
                            <Icon className="w-8 h-8 text-accent" />
                            <h3 className="mt-3 font-semibold text-xl mb-2">
                                {title}
                            </h3>
                            <p className="text-base tracking-wider font-medium mt-1">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default WhyChooseUs;
