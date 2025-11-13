import React from 'react';
import { useLoaderData } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import WhyChooseUs from '../Componets/WhyChooseUs';
import HowItWorks from '../Componets/HowItWorks';
import LatestProperty from './LatestProperty/LatestProperty';
import Satisfaction from './My ProPertise/Satisfaction';
import BrandMarquee from './My ProPertise/BrandMarquee';
import ReviewSection from './My ProPertise/ReviewSection';

// Import local images
import slider1 from '../assets/project_img_1.jpg';
import slider2 from '../assets/project_img_2.jpg';
import slider3 from '../assets/project_img_3.jpg';

// Slider data
const slides = [
  {
    id: 1,
    title: 'Welcome to Our Real Estate',
    subtitle: 'Find your dream property today',
    image: slider1,
  },
  {
    id: 2,
    title: 'Exclusive Properties',
    subtitle: 'Best deals available now',
    image: slider2,
  },
  {
    id: 3,
    title: 'Trusted by Thousands',
    subtitle: 'Your satisfaction is our priority',
    image: slider3,
  },
];

const Home = () => {
  const latestProperty = useLoaderData();
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-[80vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0"></div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative text-center px-5"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">{slide.title}</h2>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-lg md:text-2xl text-white mb-6"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-600 text-white px-6 py-3 rounded font-semibold shadow-lg"
                >
                  Explore Now
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Latest Property */}
      <div className="w-11/12 mx-auto mt-20">
        <h1 className="text-3xl font-bold text-center mb-5">
          Latest <span className="text-pink-600"> Product </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-11/12 mx-auto mb-10">
        {latestProperty?.map((latest) => (
          <LatestProperty key={latest._id} latest={latest} />
        ))}
      </div>

      {/* Why Choose Us & How It Works */}
      <WhyChooseUs />
      <HowItWorks />

      {/* Satisfaction Section */}
      <Satisfaction />

      {/* Brand Marquee */}
      <div className="mt-10 mb-10">
        <BrandMarquee />
      </div>

      {/* Review Section */}
      <ReviewSection />
    </div>
  );
};

export default Home;
