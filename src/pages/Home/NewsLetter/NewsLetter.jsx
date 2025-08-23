import React, { useState } from "react";
import { FiMail, FiBell, FiShield, FiTrendingUp } from "react-icons/fi";
import Container from "../../../components/Container/Container";
import MainTitle from "../../../components/MainTitle/MainTitle";
import { toast } from "react-toastify";

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

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const isValidEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValidEmail(email)) {
            toast.success("Subscribed Successfully");
            setEmail("");
        } else {
            toast.error("Please enter a valid email!");
        }
    };

    return (
        <Container>
            <section>
                <MainTitle text={"Subscribe to Our Newsletter"}></MainTitle>

                {/* Perks as grid cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {perks.map(({ icon: Icon, title, desc }, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border border-gray-200 px-5 py-10 flex flex-col justify-center items-center hover:scale-105 transition duration-200"
                        >
                            <Icon className="w-8 h-8 text-accent" />
                            <h3 className="mt-3 font-semibold text-xl mb-2">
                                {title}
                            </h3>
                            <p className="text-base tracking-wider font-medium mt-1">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Form as a card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center gap-2 my-4 justify-center text-xl font-semibold">
                        <FiMail className="w-6 h-6 text-accent" />
                        <p>Get the latest in your inbox</p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center justify-center gap-3 mb-8"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-64 tracking-wider border-gray-200 focus:outline-none focus:border-accent"
                        />

                        <button
                            type="submit"
                            disabled={!isValidEmail(email)}
                            className={`rounded-lg px-4 py-2 border font-semibold cursor-pointer ${
                                isValidEmail(email)
                                    ? "bg-accent text-white hover:bg-accent/90"
                                    : "bg-secondary text-primary cursor-not-allowed"
                            }`}
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
