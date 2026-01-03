import React from 'react';
import Marquee from 'react-fast-marquee';
import brand1 from '../../assets/brand1.png';
import brand2 from '../../assets/brand2.png';
import brand3 from '../../assets/brand3.png';
import brand4 from '../../assets/brand4.png';
import brand5 from '../../assets/brand5.png';
import brand6 from '../../assets/brand6.png';
import brand7 from '../../assets/brand7.png';
import brand8 from '../../assets/brand8.png';

const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8];

const BrandMarquee = () => {
  return (
    <section className="py-16 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
          Trusted by Leading{' '}
          <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            Brands & Partners
          </span>
        </h2>
        <p className="text-gray-400 mt-3 text-lg">We collaborate with the best in real estate</p>
      </div>

      {/* Marquee */}
      <Marquee
        pauseOnHover={true}
        gradient={false}
        speed={40}
        direction="left"
        className="overflow-hidden"
      >
        {brands.map((brand, index) => (
          <div key={index} className="mx-8 md:mx-12 flex items-center justify-center">
            <img
              src={brand}
              alt={`Brand Partner ${index + 1}`}
              className="h-20 md:h-24 object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
            />
          </div>
        ))}
        {brands.map((brand, index) => (
          <div key={`dup-${index}`} className="mx-8 md:mx-12 flex items-center justify-center">
            <img
              src={brand}
              alt={`Brand Partner ${index + 1}`}
              className="h-20 md:h-24 object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandMarquee;
