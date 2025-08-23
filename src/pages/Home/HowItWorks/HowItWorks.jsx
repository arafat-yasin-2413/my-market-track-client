import React from "react";
import {
    FiUserPlus,
    FiPackage,
    FiTrendingUp,
    FiCreditCard,
} from "react-icons/fi";
import Container from "../../../components/Container/Container";
import MainTitle from "../../../components/MainTitle/MainTitle";

const HowItWorks = () => {
    const steps = [
        {
            icon: FiUserPlus,
            title: "Sign Up",
            desc: "Create your MarketTrack account",
        },
        {
            icon: FiPackage,
            title: "Add Products",
            desc: "List items and set up your store dashboard",
        },
        {
            icon: FiTrendingUp,
            title: "Track Prices",
            desc: "Monitor growth with clear analytics",
        },
        {
            icon: FiCreditCard,
            title: "Pay with Stripe",
            desc: "Receive secure payouts via Stripe",
        },
    ];

    return (
        <Container>
            <section>
                <MainTitle text={"How It Works"}></MainTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map(({ icon:Icon, title, desc }, i) => (
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

export default HowItWorks;
