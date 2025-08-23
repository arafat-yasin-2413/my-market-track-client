import React from "react";
import { FaChartLine, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";

import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-primary/30 text-base-content px-10 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                
                <div className="flex flex-col justify-center items-center sm:items-start gap-4">
                    <FaChartLine size={64} className="text-blue-600" />
                    <p className="text-3xl font-semibold">MarketTrack</p>
                    <div className="flex gap-5 mt-3 text-gray-600">
                        <a
                            href="https://www.facebook.com/yasin.arafat.482092/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="hover:text-blue-600 transition"
                        >
                            <FaFacebookF size={24} />
                        </a>
                        <a
                            href="https://x.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="hover:text-blue-400 transition"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href="https://www.youtube.com/@ProgrammingHeroCommunity"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="hover:text-red-600 transition"
                        >
                            <FaYoutube size={24} />
                        </a>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h6 className="footer-title mb-4 text-xl font-semibold">
                        Contact Us
                    </h6>
                    <div className="flex items-start gap-3 mb-4">
                        <MdLocationOn className="text-2xl text-red-500 mt-1" />
                        <p className="text-gray-700">
                            123 Gulshan Avenue, Floor 5, <br />
                            Gulshan-2, Dhaka 1212, Bangladesh
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <MdPhone className="text-2xl text-green-600" />
                        <p className="text-gray-700">+880 1711-123456</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* <MdEmail className="text-2xl w-8 text-blue-600" /> */}
                        <AiTwotoneMail size={28} className="text-blue-600" />

                        <p className="text-gray-700">contact@markettrack.com</p>
                    </div>
                </div>

                {/* Company Links */}
                <nav>
                    <h6 className="footer-title mb-4 text-xl font-semibold">
                        Company
                    </h6>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/about" className="link link-hover">
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="link link-hover">
                                Contact
                            </Link>
                        </li> 
                    </ul>
                </nav>

                {/* Legal Links */}
                <nav>
                    <h6 className="footer-title mb-4 text-xl font-semibold">
                        Legal
                    </h6>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/terms" className="link link-hover">
                                Terms & Conditions
                            </Link>
                        </li>
                        
                    </ul>
                </nav>
            </div>

            {/* Copyright */}
            <div className="mt-12 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} MarketTrack. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;
