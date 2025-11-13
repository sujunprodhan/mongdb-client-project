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
import BrandMarquee from './My ProPertise/BrandMarquee';
import ReviewSection from './My ProPertise/ReviewSection';

import slider1 from '../assets/project_img_1.jpg';
import slider2 from '../assets/project_img_2.jpg';
import slider3 from '../assets/project_img_3.jpg';

const slides = [
  {
    id: 1,
    title: 'Welcome to Our Real Estate',
    subtitle: 'Find your dream property today',
    image: slider1,
  },
  { id: 2, title: 'Exclusive Properties', subtitle: 'Best deals available now', image: slider2 },
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
        className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-4 max-w-3xl"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-4">
                  {slide.title}
                </h2>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-2xl text-white mb-6"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-pink-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded font-semibold shadow-lg text-sm sm:text-base"
                >
                  Explore Now
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-11/12 mx-auto mt-10 md:mt-20">
        <h1 className="text-3xl font-bold text-center mb-5">
          Latest <span className="text-pink-600"> Product </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-11/12 mx-auto mb-10">
        {latestProperty?.map((latest) => (
          <LatestProperty key={latest._id} latest={latest} />
        ))}
      </div>

      <WhyChooseUs />
      <HowItWorks />

      <div className="mt-10 mb-10">
        <BrandMarquee />
      </div>

      <ReviewSection />
    </div>
  );
};

export default Home;
