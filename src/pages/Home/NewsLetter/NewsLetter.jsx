import React from "react";
import { FiMail, FiBell, FiShield, FiTrendingUp } from "react-icons/fi";
import Container from "../../../components/Container/Container";

const Newsletter = () => {
    const perks = [
        {
            icon: FiTrendingUp,
            title: "Market Insights",
            desc: "Weekly trends and actionable tips.",
        },
        {
            icon: FiBell,
            title: "Product Alerts",
            desc: "Stay ahead with curated updates.",
        },
        {
            icon: FiShield,
            title: "Privacy First",
            desc: "We never share your email.",
        },
    ];

    return (
        <Container>
            <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Subscribe to Our Newsletter
                </h2>

                {/* Perks as grid cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {perks.map(({ icon: Icon, title, desc }, i) => (
                        <div key={i} className="bg-white rounded-xl border p-5 flex flex-col justify-center items-center">
                            <Icon className="w-8 h-8" />
                            <h3 className="mt-3 font-semibold text-lg">
                                {title}
                            </h3>
                            <p className="text-sm opacity-80 mt-1">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Form as a card */}
                <div className="bg-white rounded-xl border p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <FiMail className="w-6 h-6" />
                        <p className="font-medium">
                            Get the latest in your inbox
                        </p>
                    </div>
                    <form className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border rounded-lg px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="rounded-lg px-4 py-2 border"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </Container>
    );
};

export default Newsletter;
