import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <section className="w-11/12 mx-auto my-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl p-8 md:p-12 bg-gradient-to-r from-white to-gray-50 shadow-sm"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-sm font-semibold text-[#F02670]">Quick Start</h3>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">How it works</h2>
          <p className="text-gray-600 mt-3">
            Find a property, contact agent, book visit — everything simplified.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {['Search Listings', 'Connect With Agent', 'Schedule Visit & Close'].map((title, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="bg-white rounded-xl p-5 border-1 border-pink-600"
            >
              <div className="w-12 h-12 rounded-full bg-[#F02670] text-white flex items-center justify-center font-semibold">
                {i + 1}
              </div>
              <h4 className="mt-4 font-semibold text-pink-600">{title}</h4>
              <p className="text-gray-500 text-sm mt-1">
                {i === 0
                  ? 'Filter by category, price & location.'
                  : i === 1
                  ? 'Call or message agent instantly.'
                  : 'Book visits & finalize your deal smoothly.'}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
