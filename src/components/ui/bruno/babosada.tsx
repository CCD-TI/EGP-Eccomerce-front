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
                draggable: true,
            });

            // Limpieza al desmontar el componente
            return () => flkty.destroy();
        }
    }, []);

    return (
        <div className="slider">
          <div className="slide-track gap-5">
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
            <div className="slide">
              <img src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt="" />
            </div>
          </div>
        </div>
    );
};

export default MyCarousel;