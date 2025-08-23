import React from "react";
import {
    FiUserPlus,
    FiPackage,
    FiTrendingUp,
    FiCreditCard,
} from "react-icons/fi";
import Container from "../../../components/Container/Container";

const HowItWorks = () => {
    const steps = [
        {
            icon: FiUserPlus,
            title: "Sign Up",
            desc: "Create your MarketTrack account in a few clicks.",
        },
        {
            icon: FiPackage,
            title: "Add Products",
            desc: "List items and set up your store dashboard.",
        },
        {
            icon: FiTrendingUp,
            title: "Track Prices",
            desc: "Monitor growth with clear analytics snapshots.",
        },
        {
            icon: FiCreditCard,
            title: "Pay with Stripe",
            desc: "Receive secure payouts via Stripe.",
        },
    ];

    return (
        <Container>
            <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map(({ icon:Icon, title, desc }, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-center items-center">
                            <Icon className="w-8 h-8 text-accent" />
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

export default HowItWorks;
