import React from 'react';
import logo from '../assets/logo.svg';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative mt-10 bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1770&q=80')`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start gap-4">
          <img src={logo} alt="Logo" className="h-12 w-auto bg-pink-600 p-1 rounded-md" />
          <h2 className="text-xl font-bold text-white">Your Website Name</h2>
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>Phone: +880 1234 567 890</li>
            <li>Email: info@yourwebsite.com</li>
            <li>Address: 123, Street, City, Country</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>
              <a href="/terms" className="hover:text-[#E60076] transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-[#E60076] transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex gap-4 text-[#E60076] text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
