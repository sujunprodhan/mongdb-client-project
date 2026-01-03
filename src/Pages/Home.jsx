import React from 'react';
import { useLoaderData } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import LatestProperty from './LatestProperty/LatestProperty';
import WhyChooseUs from '../Componets/WhyChooseUs';
import HowItWorks from '../Componets/HowItWorks';
import BrandMarquee from './My ProPertise/BrandMarquee';
import FaqSection from './My ProPertise/FAQSection';
import Newsletter from './My ProPertise/Newsletter';

const slides = [
  {
    id: 1,
    title: 'Welcome to Premium Real Estate',
    subtitle: 'Discover your dream property with confidence',
    image:
      'https://mbluxury1.s3.amazonaws.com/2024/02/01151752/luxury-real-estate-website-design-scaled.jpg',
  },
  {
    id: 2,
    title: 'Exclusive Luxury Properties',
    subtitle: 'Handpicked villas, apartments & prime locations',
    image:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/luxury-villa-in-bali-above-a-flowing-river-and-waterfall-free-photo.jpeg?w=2000&quality=80',
  },
  {
    id: 3,
    title: 'Trusted by Thousands',
    subtitle: 'Your satisfaction is our top priority',
    image:
      'https://thumbs.dreamstime.com/b/elegant-modern-home-exterior-multi-car-garage-landscaped-lawn-twilight-luxury-property-features-stucco-stone-accents-398569527.jpg',
  },
];

const Home = () => {
  const latestProperty = useLoaderData();

  return (
    <div className="overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={2200}
        allowTouchMove={false}
        className="w-full h-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                className="relative z-10 text-center px-6 max-w-5xl"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1.4 }}
                  className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1.4 }}
                  className="text-xl md:text-2xl text-pink-100 mb-12 max-w-3xl mx-auto drop-shadow-lg font-light"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 1 }}
                >
                  <button className="px-10 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/60 hover:scale-105 transition-all duration-500">
                    Explore Now
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Latest Properties Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">
            Latest{' '}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Properties
            </span>
          </h1>
          <p className="text-xl text-gray-600 mt-4">Curated premium listings updated daily</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-11/12 max-w-7xl mx-auto">
          {latestProperty?.map((latest) => (
            <LatestProperty key={latest._id} latest={latest} />
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <HowItWorks />
      <div className="py-10 bg-gray-50">
        <BrandMarquee />
      </div>
      <div>
        <Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default Home;
