import React from "react";
import { motion } from "framer-motion";

const TermsConditions = () => {
    return (
        <motion.div
            className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h1 className="text-4xl font-bold mb-8 text-center">
                Terms and Conditions
            </h1>

            <section className="mb-6">
                <p className="mb-4">
                    Welcome to MarketTrack. These terms and conditions outline
                    the rules and regulations for the use of our website.
                </p>
                <p className="mb-4">
                    By accessing this website we assume you accept these terms
                    and conditions in full. Do not continue to use MarketTrack’s
                    website if you do not accept all of the terms and conditions
                    stated on this page.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Use License</h2>
                <p className="mb-4">
                    Permission is granted to temporarily download one copy of
                    the materials (information or software) for personal,
                    non-commercial transitory viewing only. This is the grant of
                    a license, not a transfer of title, and under this license
                    you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Modify or copy the materials;</li>
                    <li>
                        Use the materials for any commercial purpose or for any
                        public display;
                    </li>
                    <li>
                        Attempt to reverse engineer any software contained on
                        MarketTrack’s website;
                    </li>
                    <li>
                        Remove any copyright or other proprietary notations from
                        the materials;
                    </li>
                    <li>
                        Transfer the materials to another person or “mirror” the
                        materials on any other server.
                    </li>
                </ul>
                <p className="mt-4">
                    This license shall automatically terminate if you violate
                    any of these restrictions and may be terminated by
                    MarketTrack at any time.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    User Responsibilities
                </h2>
                <p className="mb-4">
                    As a user, you agree not to misuse the MarketTrack website
                    by knowingly introducing viruses, trojans, worms, logic
                    bombs or other material which is malicious or
                    technologically harmful.
                </p>
                <p className="mb-4">
                    You must not attempt to gain unauthorized access to the
                    website, the server on which the website is stored, or any
                    server, computer or database connected to the website.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Limitation of Liability
                </h2>
                <p className="mb-4">
                    MarketTrack will not be liable for any damages arising out
                    of the use or inability to use the materials on its website,
                    even if MarketTrack or an authorized representative has been
                    notified orally or in writing of the possibility of such
                    damage.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                <p className="mb-4">
                    We take your privacy seriously. Please review our Privacy
                    Policy to understand how we collect, use, and protect your
                    information.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Changes to Terms
                </h2>
                <p className="mb-4">
                    MarketTrack reserves the right to revise these terms and
                    conditions at any time. By using this website you are
                    agreeing to be bound by the current version of these Terms
                    and Conditions.
                </p>
            </section>

            <section className="mb-4 text-center text-gray-500 text-sm">
                Last updated: July 2025
            </section>
        </motion.div>
    );
};

export default TermsConditions;
