import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  return (
    <section className="w-11/12 mx-auto my-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-sm font-semibold text-[#F02670]">Why Choose Us</h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Find your next home — fast, safe, reliable
          </h2>
          <p className="text-gray-600 mt-4">
            We combine curated listings, verified sellers, and friendly support so you can move with
            confidence.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F02670] text-white flex items-center justify-center font-semibold">
                {item}
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">
                  {item === 1
                    ? 'Verified Listings'
                    : item === 2
                    ? 'Trusted Agents'
                    : 'Simple & Secure'}
                </h4>

                <p className="text-gray-500 text-sm mt-1">
                  {item === 1
                    ? 'Every property is checked for accuracy.'
                    : item === 2
                    ? 'Work with highly trusted local agents.'
                    : 'Clear info, transparent pricing, secure process.'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
