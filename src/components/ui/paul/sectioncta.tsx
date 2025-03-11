import React, { useState } from "react";
import CountdownTimer from "@/components/ui/paul/countdowntimer";
import { Modal } from "@mui/material";
import PacksSectionModalCasi from "./packsectionmodal-CASI";
import PacksSectionModalCasiV2 from "./packsectionmodal-CASI-V2";
import ModalPromo from "./ModalPromo";
import { environment } from "@/environments/environment";

const SectionCTA = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const contador:string = environment.contador;
  const toggleModal = () => setModalOpen(!isModalOpen);
  return (
    <section className="relative bg-landing-end py-16 px-6 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        {/* Títulos */}
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-medium">
          No postergues más tu educación,
        </h2>
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mt-2 neon-white">
          ¡TU FUTURO
          <br />
          <span className="text-white text-[30px]">TE ESTÁ ESPERANDO!</span>
        </h1>
        <p className="text-white text-sm md:text-base mt-4 max-w-2xl mx-auto">
          Un nuevo empleo, mejor salario, mayor calidad de vida. ¡Todo lo puedes
          conseguir con educación! Es el momento de lograr lo que siempre has
          querido.
        </p>
        <h2 className="text-colors-cyan-ccd text-2xl md:text-3xl lg:text-4xl mt-6 font-medium neon-cyan">
          ¡El tiempo se acaba!
        </h2>

        {/* Temporizador */}
        <div className="flex justify-center gap-4 mt-6">
        <CountdownTimer targetDate={contador} />
        </div>

        {/* Botón */}
        <div className="mt-8">
          <div>
            <h4 className="text-colors-cyan-ccd text-xl md:text-2xl font-medium mb-5">
              ¿Estás listo?
            </h4>
          </div>
          {/* Botón */}
          <ModalPromo css=" border-3 hover:text-colors-dark-blue-ccd bg-transparent border-colors-cyan-ccd text-colors-cyan-ccd 
          text-[30px] font-bold rounded-2xl 
          shadow-lg hover:bg-[#00d3c5] hover:shadow-[0_0_25px_5px_rgba(0,234,223,0.7)] transition-all duration-300 p-4 px-10" />
          </div>
        </div>
  

      {/* Modal usando Material-UI */}
      <Modal open={isModalOpen} onClose={toggleModal}>
        <div className="flex justify-center items-center h-screen ">
          {/* <PacksSectionModalCasi onClose={toggleModal} /> */}
          <PacksSectionModalCasiV2 onClose={toggleModal} />
        </div>
      </Modal>
    </section>
  );
};

export default SectionCTA;
