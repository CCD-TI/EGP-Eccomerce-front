import React from 'react'

function RutaVideo() {
  return (
    
    <section className='py-14 bg-rutasVideo'>
        <div className='container mx-auto flex flex-col justify-center items-center gap-10'>
                <div className='w-full flex flex-col gap-2 justify-center items-center'>
                    <h2 className='text-colors-cyan-ccd text-5xl font-bold'>Sobre la </h2>
                    <h1 className='neon-white font-bold text-5xl'>RUTA</h1>
                </div>
                <div className="flex px-6 justify-center">
                <video
               
                  className="video-vertical rounded-xl"
                  width={800}
                  src="/Multimedia/Video/cddnosotros.mp4"
                  controls={false}
                  autoPlay
                  muted
                  loop
                 
                />
              </div>
        </div>
    </section>
  )
}

export default RutaVideo
