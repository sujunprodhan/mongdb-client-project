import { useState } from 'react';
import ConsultationModal from '../ConsultationModal/ConsultationModal';


const AgentSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <img
          src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
          className="rounded-3xl shadow-xl"
        />

        {/* Agent Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">Talk With Our Property Consultant</h2>

          <p className="text-gray-600 text-lg">
            Get expert advice on buying, selling & investing in premium real estate.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-semibold shadow-lg transition"
          >
            Book a Consultation
          </button>
        </div>
      </div>

      {/* Modal */}
      <ConsultationModal open={open} setOpen={setOpen} />
    </section>
  );
};

export default AgentSection;
