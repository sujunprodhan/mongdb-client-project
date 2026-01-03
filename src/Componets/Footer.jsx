import React from 'react';
import logo from '../assets/logo.svg';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/light-trails-buildings_1359-715.jpg?semt=ais_hybrid')`, // Modern city night view
        }}
      />

      {/* Dark Overlay with Pink Tint for Text Visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-auto bg-pink-600 p-2 rounded-lg shadow-lg"
              />
              <h2 className="text-2xl font-black">Your Real Estate</h2>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-xs">
              Leading real estate platform connecting buyers and sellers with premium properties
              worldwide.
            </p>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-pink-500 inline-block pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-pink-400">📞</span> +880 1234 567 890
              </li>
              <li className="flex items-center gap-3">
                <span className="text-pink-400">✉️</span> info@yourrealestate.com
              </li>
              <li className="flex items-center gap-3">
                <span className="text-pink-400">📍</span> 123 Luxury Street, Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-pink-500 inline-block pb-2">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-pink-400 transition duration-300"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-pink-400 transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  className="text-gray-300 hover:text-pink-400 transition duration-300"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-pink-500 inline-block pb-2">
              Follow Us
            </h3>
            <div className="flex gap-5 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-pink-600 hover:scale-110 transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-pink-600 hover:scale-110 transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-pink-600 hover:scale-110 transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-pink-600 hover:scale-110 transition duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-gray-400 text-sm">
          Designed with ❤️ for modern real estate experiences
        </div>
      </div>
    </footer>
  );
};

export default Footer;
