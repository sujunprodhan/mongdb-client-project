import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, ShieldCheck, Users } from 'lucide-react';
import HeroImg from '../../assets/About.png';
import Future from '../../assets/futuresection.png';

const About = () => {
  return (
    <section className="overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-96 md:h-[32rem] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-pink-400/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/40 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Properties
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
            Discover premium real estate projects crafted for modern living
          </p>
        </motion.div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="bg-pink-50 py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.img
              src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
              alt="Real Estate"
              className="rounded-3xl shadow-2xl"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-pink-500 mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To deliver premium-quality real estate through innovative design, transparency,
                  and long-term value.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-pink-500 mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become a trusted real estate brand known for architectural excellence and
                  lifestyle-focused developments.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-14"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-center text-pink-600">
              Why Choose Us
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: MapPin, title: 'Prime Locations' },
                { icon: Building2, title: 'Modern Architecture' },
                { icon: ShieldCheck, title: 'Secure Investment' },
                { icon: Users, title: 'Trusted Clients' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-2xl shadow-md text-center transition"
                >
                  <item.icon size={42} className="mx-auto mb-4 text-pink-500" />
                  <h4 className="text-xl font-semibold text-gray-800">{item.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl py-24 px-6 text-center"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${Future})` }}
            />
            <div className="absolute inset-0 bg-black/65" />

            {/* Glow */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Build Your Future With Us
              </h3>
              <p className="text-pink-100 text-lg mb-10">
                Invest in thoughtfully designed properties that combine luxury, comfort, and strong
                long-term returns.
              </p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-14 py-4 rounded-full text-lg font-semibold shadow-xl transition">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default About;
