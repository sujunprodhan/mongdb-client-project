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
    <div className="bg-gray-100 py-2">
      <Marquee pauseOnHover gradient={false} speed={50}>
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt={`Brand ${index}`}
            className="h-16 mx-4 object-contain"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default BrandMarquee;
