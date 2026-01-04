import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/Authprovider';
import { toast } from 'react-toastify';

const ConsultationModal = ({ open, setOpen }) => {
  const { user, loading } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!user) {
      toast.error('Please login first');
      return;
    }

    const form = e.target;
    const consultationData = {
      name: user.displayName || form.name.value,
      email: user.email,
      userId: user.uid,
      phone: form.phone.value, 
      message: form.message.value,
    };

    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:3000/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultationData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed');
      }

      toast.success('Consultation booked successfully');
      setOpen(false);
      form.reset();
    } catch (err) {
      toast.error(err.message || 'Booking failed ');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 w-full max-w-md relative"
      >
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400">
          ✕
        </button>

        <h3 className="text-2xl font-bold text-pink-600 mb-6">Book a Consultation</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            defaultValue={user?.displayName || ''}
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl"
          />

          <input
            value={user?.email || ''}
            disabled
            className="w-full p-3 border rounded-xl bg-gray-100"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold"
          >
            {submitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ConsultationModal;
