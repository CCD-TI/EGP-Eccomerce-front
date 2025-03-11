import React from 'react'
import Map from '@/components/ui/paul/map'

const MapSection = () => {
  return (
    <section className="w-full h-full    py-16  text-black  ">
        <div className="w-[90%] h-full  lg:w-[70%] mx-auto flex flex-col gap-14 items-center px-2 lg:flex-row ">
          <div className='  lg:py-10 w-full h-full ' data-aos="fade-up"   >
            <Map/>
          </div>

          <div className=" h-[400px] flex flex-col max-sm:p-6 py-10 px-4 bg-white  rounded-xl gap-4 w-full  lg:w-[50%] text-[#2F84F6]" data-aos="zoom-in">
            <div className='flex gap-2 '>

              <span className="text-3xl sm:text-4xl lg:text-4xl font-extrabold">Contáctanos</span>
            </div>
            <div className='flex gap-2 items-center'>
              <img src='/Multimedia/Imagen/Iconos/CONTACTOS/INSCRIPCCIÓN.png' className='w-14 h-14' />
              <div className='flex flex-col'>
                <p className='text-[#000040] text-base   font-bold'>Inscripciones - Matrícula</p>
                <p className='text-xs text-[#000040]'>(+51) 908 841 254</p>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <img src='/Multimedia/Imagen/Iconos/CONTACTOS/ACADÉMICO.png' className='w-14 h-14' />
              <div className='flex flex-col'>
                <p className='text-[#000040] text-base  font-bold'>Dirección Académica</p>
                <p className='text-xs text-[#000040]'>(+51) 908 826 878</p>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <img src='/Multimedia/Imagen/Iconos/CONTACTOS/CORREO.png' className='w-14 h-14' />
              <div className='flex flex-col'>
                <p className='text-[#000040] text-base  font-bold'>Correo Electrónico</p>
                <p className='text-xs text-[#000040]'>informes@ccdcapacitacion.edu.pe</p>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <img src='/Multimedia/Imagen/Iconos/CONTACTOS/UBICACIÓN.png' className='w-14 h-14' />
              <div className='flex flex-col'>
                <p className='text-[#000040]  text-base  font-bold'>Ubicacion</p>
                <p className='text-xs text-[#000040]'>AV.Rivera Navarrete 762, San isidro, Lima / Oficina 1001 </p>
                <p className='text-xs text-[#000040]'><b>Referencia</b> Torre Andina </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default MapSection
