import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import AgentSection from '../AgentSection/AgentSection';
import contact from '../../assets/header_img.png'

const ContactPage = () => {
  return (
    <section
      className=" bg-cover bg-black/50 z-10 bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${contact})` }}
    >
      {/* Blur Orbs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="max-w-7xl p-10 mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get in Touch With Us
          </h1>
          <p className="text-white max-w-xl mx-auto text-lg">
            Have questions about properties or investments? Our expert team is ready to help you.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white">Contact Information</h2>

            <div className="space-y-5">
              {[
                { icon: MapPin, title: 'Office Address', value: 'Gulshan, Dhaka, Bangladesh' },
                { icon: Phone, title: 'Phone', value: '+880 1234 567 890' },
                { icon: Mail, title: 'Email', value: 'info@realestate.com' },
                { icon: Clock, title: 'Working Hours', value: 'Sat - Thu: 9:00 AM - 6:00 PM' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border border-pink-100 p-6 rounded-2xl shadow-md"
                >
                  <item.icon className="text-pink-500" size={28} />
                  <div>
                    <h4 className="font-semibold text-gray-100">{item.title}</h4>
                    <p className="text-gray-100">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-pink-100 rounded-3xl shadow-xl p-10 space-y-6"
          >
            <h2 className="text-3xl  font-bold text-white mb-4">Send Us a Message</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="px-5 py-4 border text-gray-100 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300/50 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-5 py-4 border text-gray-100 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300/50 outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-5 text-gray-100 py-4 border border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300/50 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full text-gray-100 px-5 py-4 border border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300/50 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 rounded-xl shadow-lg transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
      <AgentSection></AgentSection>
    </section>
  );
};

export default ContactPage;
