import React, { useEffect, useRef } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';

const MyCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const flkty = new Flickity(carouselRef.current, {
        wrapAround: true,
        autoPlay: 3000,
        pageDots: true,
        cellAlign: 'left',
      });

      // Limpieza al desmontar el componente
      return () => flkty.destroy();
    }
  }, []);

  return (
    <div ref={carouselRef} className="carousel px-4">
      <div className="carousel-cell p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
          <img className="w-full h-64 object-cover" src="/img/inicio.jpg" alt="Image 1" />
          <div className="p-4 bg-gradient-to-b from-transparent to-black text-center">
            <h3 className="text-lg font-semibold text-white">Sistemas administrativos del Estado: SIGA, SIAF, SEACE</h3>
            <p className="text-gray-300">Diplomado especializado</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">VER PROGRAMA</button>
          </div>
        </div>
      </div>

      <div className="carousel-cell p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
          <img className="w-full h-64 object-cover" src="/img/inicio.jpg" alt="Image 2" />
          <div className="p-4 bg-gradient-to-b from-transparent to-black text-center">
            <h3 className="text-lg font-semibold text-white">Sistema nacional de programación multianual y gestión de inversiones Invierte.pe</h3>
            <p className="text-gray-300">Diplomado especializado</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">VER PROGRAMA</button>
          </div>
        </div>
      </div>
      <div className="carousel-cell p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
          <img className="w-full h-64 object-cover" src="/img/inicio.jpg" alt="Image 2" />
          <div className="p-4 bg-gradient-to-b from-transparent to-black text-center">
            <h3 className="text-lg font-semibold text-white">Sistema nacional de programación multianual y gestión de inversiones Invierte.pe</h3>
            <p className="text-gray-300">Diplomado especializado</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">VER PROGRAMA</button>
          </div>
        </div>
      </div>


     <div className="carousel-cell p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
          <img className="w-full h-64 object-cover" src="/img/inicio.jpg" alt="Image 2" />
          <div className="p-4 bg-gradient-to-b from-transparent to-black text-center">
            <h3 className="text-lg font-semibold text-white">Sistema nacional de programación multianual y gestión de inversiones Invierte.pe</h3>
            <p className="text-gray-300">Diplomado especializado</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">VER PROGRAMA</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCarousel;
