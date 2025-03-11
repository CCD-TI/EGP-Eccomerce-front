import React from "react";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { PiBookBookmarkFill } from "react-icons/pi";
import { TbClockHour8Filled } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { Avatar, AvatarGroup, Chip, Progress } from "@nextui-org/react";
import { RiRadioButtonLine } from "react-icons/ri";
import Link from "next/link";

interface CourseCardProps {
    array: any;
    openSideSheet:any;
}

const CardCursoR: React.FC<CourseCardProps> = ({
    array,openSideSheet
}) => {
    const transformText = (str:any) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };
    return (
            <div onClick={() => openSideSheet(array)}  className="group relative bg-opacity-100 w-[300px] h-[25rem] rounded-lg overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300">
                {/* Imagen */}
                <div className="relative">
                    <img
                        src={'https://i.pinimg.com/736x/fc/1d/55/fc1d55dd7e2c3ffd78d367726648b3f9.jpg'}
                        alt="Curso"
                        className="w-[300px] h-full object-cover"
                    />

                    <AvatarGroup className='absolute bottom-[-0.7rem] left-3 z-[11]'>
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                    </AvatarGroup>
                </div>

                {/* Contenido */}
                <div
                    className={`p-4 text-white rounded-b-2xl rounded-t-none -mt-4 pt-7 ${array.Escuela === "Gestión"
                        ? "bg-gradient-to-br from-[rgba(255,0,0,0.4)] via-[rgba(22,46,84,0.5)] to-[rgba(255,0,0,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
                        : array.Escuela === "Ingeniería"
                            ? "bg-gradient-to-br from-[rgba(0,96,254,0.4)] via-[rgba(22,46,84,0.5)] to-[rgba(0,96,254,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
                            : "bg-gradient-to-br from-[rgba(249,115,22,0.6)] via-[rgba(22,46,84,0.5)] to-[rgba(255,115,22,0.5)] border-2 border-[rgba(22,46,84,0.4)]"
                        }`}
                >
                    {/* Título */}
                    <div className="flex justify-between">

                        <h3 className="font-bold text-xl leading-tight mb-2">{transformText(array.Curso)}</h3>
                        <Chip startContent={<RiRadioButtonLine className='text-white' />} className="bg-blue-1 text-white px-2" variant="flat">
                            Asincrónico
                        </Chip>
                        {/* <Chip startContent={<RiRadioButtonLine className='text-white' />} className="bg-red-600 text-white px-2" variant="flat">
                                            {mod1}
                                        </Chip> */}
                    </div>
                    {/* Estadísticas */}
                    <div className="flex items-center gap-2 mt-3 text-white">
                        <span className="flex items-center text-base gap-1">
                            <FaUser />
                            {array.Seguidores}
                        </span>
                        <span className="text-colors-cyan-ccd text-base">|</span>
                        <span className="flex items-center text-base gap-1">
                            <AiFillLike /> {array.Calificacion}
                        </span>
                        <span className="text-colors-cyan-ccd">|</span>
                        <span className="flex items-center gap-1">
                            <TbClockHour8Filled /> {array.HorasAcademicas}
                        </span>
                    </div>
                    <Progress classNames={{ "indicator": "bg-[#007FED]" }} color="primary" value={45} aria-label={`Progreso del curso: ${50}%`} />
                    <div className='flex justify-between'>
                        <h1 className='text-white'>Completado: 45%</h1>
                        <h1 className='text-white'>4/13</h1>
                    </div>


                </div>
            </div>
    );
};

export default CardCursoR;
