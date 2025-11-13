import React from 'react';
import { FaHome, FaUsers, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';
import image from '../../assets/project_img_4.jpg';

const stats = [
  { id: 1, icon: <FaHome size={40} />, label: 'Properties Sold', value: 200 },
  { id: 2, icon: <FaUsers size={40} />, label: 'Happy Clients', value: 500 },
  { id: 3, icon: <FaAward size={40} />, label: 'Awards Won', value: 15 },
];

const Satisfaction = () => {
  return (
    <div className="relative py-20 my-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-40 w-full h-full"></div>

      {/* Content */}
      <div className="relative z-10 w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-12">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white bg-opacity-90 rounded-2xl shadow-lg py-10 px-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-[#F0256E] mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.value}+</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Satisfaction;
