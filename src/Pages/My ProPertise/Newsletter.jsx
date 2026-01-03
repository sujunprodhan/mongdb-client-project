import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/Authprovider';
import subscription from '../../assets/newsletter.png';

const Newsletter = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [localLoading, setLocalLoading] = useState(false); 
  const isLoading = authLoading || localLoading; 
  const subscribeViaBackend = async (email) => {
    const response = await fetch('http://localhost:3000/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), userId: user?.uid || null }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Subscription failed');
    }

    return response.json();
  };

  const handleSubscribe = async (e) => {
    e.preventDefault(); 
    if (!email.trim()) {
      toast.error('Please enter a valid email');
      return;
    }

    setLocalLoading(true);

    try {
      await subscribeViaBackend(email.trim());
      toast.success('Subscribed successfully! 🎉');
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      toast.error(err.message || 'Subscription failed. Try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <section
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${subscription})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-6">
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
          onSubmit={handleSubscribe} // ✅ fixed
          className="max-w-xl mx-auto backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200/50 bg-white/10"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 bg-white/10 border border-pink-500/20 rounded-2xl text-pink-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-4 bg-pink-600/90 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-sm text-white mt-4">
            No spam • Unsubscribe anytime • We value your privacy
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
