import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper as SwiperClass } from 'swiper/types';
// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Image,Button, Divider } from '@nextui-org/react';

export default function App() {
    const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  
    let appendNumber = 4;
    let prependNumber = 1;
  
    const prepend2 = () => {
      if (swiperRef) {
        swiperRef.prependSlide([
          '<div class="swiper-slide">Slide ' + --prependNumber + '</div>',
          '<div class="swiper-slide">Slide ' + --prependNumber + '</div>',
        ]);
      }
    };
  
    const prepend = () => {
      if (swiperRef) {
        swiperRef.prependSlide(
          '<div class="swiper-slide">Slide ' + --prependNumber + '</div>'
        );
      }
    };
  
    const append = () => {
      if (swiperRef) {
        swiperRef.appendSlide(
          '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>'
        );
      }
    };
  
    const append2 = () => {
      if (swiperRef) {
        swiperRef.appendSlide([
          '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>',
          '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>',
        ]);
      }
    };
  
    return (
      <>
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
        
          <SwiperSlide>
          <div className='w-[300px] h-[400px] border-2 shadow-lg'>
                <div className="bg-muted flex w-full flex-col items-center justify-center">
                  <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 h-[15rem] w-full rounded-tr-md rounded-bl-none rounded-br-none"
                    src="/Multimedia/Imagen/Cursos/ejem1.png"
                  />
                </div>
                <div className="w-[100%] p-4 flex flex-col gap-4 bg-white shadow-lg rounded-md">
                  <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl'>Joseph Castillo Rivera</h1>
                    <h1 className=''>Ingeniero de Sistemas e Informatica</h1>
                    <Divider />
                    <div className='flex justify-between'>
                      <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Ing. Sistemas
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className='w-[300px] h-[400px] border-2 shadow-lg'>
                <div className="bg-muted flex w-full flex-col items-center justify-center">
                  <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 h-[15rem] w-full rounded-tr-md rounded-bl-none rounded-br-none"
                    src="/Multimedia/Imagen/Cursos/ejem1.png"
                  />
                </div>
                <div className="w-[100%] p-4 flex flex-col gap-4 bg-white shadow-lg rounded-md">
                  <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl'>Joseph Castillo Rivera</h1>
                    <h1 className=''>Ingeniero de Sistemas e Informatica</h1>
                    <Divider />
                    <div className='flex justify-between'>
                      <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Ing. Sistemas
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className='w-[300px] h-[400px] border-2 shadow-lg'>
                <div className="bg-muted flex w-full flex-col items-center justify-center">
                  <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 h-[15rem] w-full rounded-tr-md rounded-bl-none rounded-br-none"
                    src="/Multimedia/Imagen/Cursos/ejem1.png"
                  />
                </div>
                <div className="w-[100%] p-4 flex flex-col gap-4 bg-white shadow-lg rounded-md">
                  <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl'>Joseph Castillo Rivera</h1>
                    <h1 className=''>Ingeniero de Sistemas e Informatica</h1>
                    <Divider />
                    <div className='flex justify-between'>
                      <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Ing. Sistemas
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className='w-[300px] h-[400px] border-2 shadow-lg'>
                <div className="bg-muted flex w-full flex-col items-center justify-center">
                  <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 h-[15rem] w-full rounded-tr-md rounded-bl-none rounded-br-none"
                    src="/Multimedia/Imagen/Cursos/ejem1.png"
                  />
                </div>
                <div className="w-[100%] p-4 flex flex-col gap-4 bg-white shadow-lg rounded-md">
                  <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl'>Joseph Castillo Rivera</h1>
                    <h1 className=''>Ingeniero de Sistemas e Informatica</h1>
                    <Divider />
                    <div className='flex justify-between'>
                      <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Ing. Sistemas
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
          </SwiperSlide>
          
        </Swiper>
  
      
      </>
    );
  }
  