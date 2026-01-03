import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How do I list my property?',
      a: 'Simply click "Add Property" in dashboard and fill the form. We review and publish within 24 hours.',
    },
    {
      q: 'Are there any listing fees?',
      a: 'No hidden fees. Basic listing is free, premium visibility packages available.',
    },
    {
      q: 'How are properties verified?',
      a: 'Our team manually verifies documents and visits properties for authenticity.',
    },
    { q: 'Can I edit my listing?', a: 'Yes! Go to "My Properties" and click edit anytime.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-center mb-16"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="backdrop-blur-sm bg-white/80 border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-pink-50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900">{faq.q}</h3>
                <span className="text-2xl text-pink-600">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
