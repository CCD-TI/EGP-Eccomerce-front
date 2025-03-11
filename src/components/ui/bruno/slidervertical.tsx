export default function VerticalCardSlider() {
    const cards = [
      { name: "Sumit Kapoor", role: "Frontend Developer", imgSrc: "/Multimedia/Imagen/ccdlogo.png" },
      { name: "Andrew Neil", role: "YouTuber & Blogger", imgSrc: "/Multimedia/Imagen/ccdlogo.png" },
      { name: "Jasmine Carter", role: "Freelancer & Vlogger", imgSrc: "/Multimedia/Imagen/ccdlogo.png"},
      { name: "Justin Chung", role: "Backend Developer", imgSrc:"/Multimedia/Imagen/ccdlogo.png" },
      { name: "Adrina Calvo", role: "Teacher & Advertiser", imgSrc: "/Multimedia/Imagen/ccdlogo.png" },
    ];
  
    return (
      <div className="w-full flex items-center justify-center max-lg:h-[40vh] ">
        <div className="relative flex justify-normal w-full max-w-[1200px]">
          {cards.map((card, index) => (
            <div
              key={index}
              className="absolute w-[90%] max-w-[400px] md:max-w-[600px] lg:max-w-[800px] p-8 max-sm:p-2 bg-white rounded-[100px_20px_20px_100px] shadow-md opacity-0 pointer-events-none animate-cardSlide"
              style={{ animationDelay: `${index * 3}s` }}
            >
              <div className="flex items-center relative ">
                <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] absolute left-[-5px] bg-white rounded-full p-1 shadow-lg">
                  <img
                    src={card.imgSrc}
                    alt={card.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="ml-[8rem] ">
                  <span className="font-semibold text-lg md:text-xl">{card.name}</span>
                  <p className="text-sm md:text-base">{card.role}</p>
                </div>
              </div>
            
            </div>
          ))}
        </div>
      </div>
    );
  }
  