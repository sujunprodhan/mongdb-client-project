
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/Authprovider';

const Newsletter = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'subscribers'), {
        email: email.trim(),
        userId: user?.uid || null,
        userEmail: user?.email || null,
        subscribedAt: serverTimestamp(),
      });
      toast.success('Subscribed successfully! 🎉');
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error('Subscription failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-linear-to-b from-pink-400 to-pink-500 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-300w-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-pink-400 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
            Get the latest property listings, market updates, and exclusive offers delivered to your
            inbox.
          </p>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubscribe}
          className="max-w-xl mx-auto bg-pink-100 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 bg-white/90 border border-pink-500 rounded-2xl text-pink-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-pink-600 text-white font-semibold rounded-2xl shadow-lg  hover:shadow-xl"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-sm text-pink-600 mt-4">
            No spam • Unsubscribe anytime • We value your privacy
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
