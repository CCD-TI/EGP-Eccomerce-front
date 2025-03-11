import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-[200px] md:h-[400px] lg:h-[400px] relative overflow-hidden rounded-xl">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d487.65654755836806!2d-77.02659587800487!3d-12.094867071222563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c865c35d0905%3A0x89d91859d476646c!2sAv.%20Rivera%20Navarrete%20762!5e0!3m2!1ses-419!2spe!4v1730213599530!5m2!1ses-419!2spe"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute top-0 left-0 w-full h-full transition duration-300 ease-in-out transform hover:scale-105"
      ></iframe>
    </div>
  );
};

export default Map;
