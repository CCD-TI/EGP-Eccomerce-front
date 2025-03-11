import React, { useState } from 'react';

export default function ImageGridWithLightbox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  const images = [
    '/Multimedia/Imagen/ccdcorp/1.jpg',
    '/Multimedia/Imagen/ccdcorp/3.jpg',
    '/Multimedia/Imagen/ccdcorp/6.jpg',
    '/Multimedia/Imagen/ccdcorp/4.png',
    '/Multimedia/Imagen/ccdcorp/5.jpg',
    '/Multimedia/Imagen/ccdcorp/7.jpg',
    '/Multimedia/Imagen/ccdcorp/8.jpg',
    '/Multimedia/Imagen/ccdcorp/9.png',
    '/Multimedia/Imagen/ccdcorp/10.jpg',
  ];

  const openModal = (index: number) => {
    setCurrentSlide(index + 1);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Desactivar el scroll en el fondo
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Reactivar el scroll en el fondo
  };

  const plusSlides = (n: number) => {
    setCurrentSlide((prevIndex) => {
      const newIndex = prevIndex + n;
      if (newIndex > images.length) return 1;
      if (newIndex < 1) return images.length;
      return newIndex;
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-[83%] flex  max-lg:w-[60%] max-sm:w-[90%] max-lg:flex-col gap-6">
          {/* Primer conjunto de imágenes */}
          <div className="w-[33%] max-lg:w-full grid grid-cols-2 gap-4">
            <div className="col-span-2 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[0]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(0)}
                alt="Image 1"
                data-aos="fade-up" data-aos-delay="100"
              />
            </div>
            <div className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[1]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(1)}
                alt="Image 2"
                data-aos="fade-up" data-aos-delay="200"
              />
            </div>
            <div className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[2]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(2)}
                alt="Image 3"
                data-aos="fade-up" data-aos-delay="300"
              />
            </div>
          </div>

          {/* Segundo conjunto de imágenes */}
          <div className="w-[33%] max-lg:w-full grid grid-cols-2 gap-4">
            <div className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[3]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(3)}
                alt="Image 4"
                data-aos="fade-up" data-aos-delay="400"
              />
            </div>
            <div className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[4]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(4)}
                alt="Image 5"
                data-aos="fade-up" data-aos-delay="500"
              />
            </div>
            <div className="col-span-2 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[5]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(5)}
                alt="Image 6"
                data-aos="fade-up" data-aos-delay="600"
              />
            </div>
          </div>

          {/* Tercer conjunto de imágenes */}
         <div className="w-[33%] max-lg:w-full grid grid-cols-2 gap-4">
            <div className="col-span-2 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[6]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(6)}
                alt="Image 7"
                data-aos="fade-up" data-aos-delay="700"
              />
            </div>
            <div className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[7]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(7)}
                alt="Image 8"
                data-aos="fade-up" data-aos-delay="800"
              />
            </div>
            <div className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={images[8]}
                className="w-full h-full rounded-2xl"
                onClick={() => openModal(8)}
                alt="Image 9"
                data-aos="fade-up" data-aos-delay="900"
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          id="modal"
          className="fixed w-full h-full inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[1000]"
        >
          <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Close Button */}
            <div className="relative flex justify-center items-center w-full h-full p-4">
              <img
                src={images[currentSlide - 1]}
                className="w-full h-full object-contain"
                alt={`Slide ${currentSlide}`}
              />
              <button
                className="absolute top-4 right-4 text-white text-4xl cursor-pointer p-2"
                onClick={closeModal}
              >
                X
              </button>
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 cursor-pointer"
              onClick={() => plusSlides(-1)}
            >
              &#10094;
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 cursor-pointer"
              onClick={() => plusSlides(1)}
            >
              &#10095;
            </button>

            {/* Slide Counter */}
            <div className="absolute bottom-12 w-full flex justify-center p-2 bg-black bg-opacity-60">
              <p className="text-white">
                {currentSlide} / {images.length}
              </p>
            </div>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-2 w-full flex justify-center gap-2 p-2 bg-black bg-opacity-60 overflow-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 border-transparent ${currentSlide === index + 1 ? 'border-white opacity-100' : 'opacity-60'}`}
                  onClick={() => setCurrentSlide(index + 1)}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
