import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { PiBookBookmarkFill } from "react-icons/pi";
import { TbClockHour8Filled } from "react-icons/tb";
import { FaArrowLeft, FaCartShopping, FaMixer } from "react-icons/fa6";
import {
  Avatar,
  AvatarGroup,
  Chip,
  Progress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { RiRadioButtonLine } from "react-icons/ri";
import Link from "next/link";
import { CiStreamOn } from "react-icons/ci";
import { BiSolidVideoRecording } from "react-icons/bi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface CourseCardProps {
  array: any;
}

const CardCurso: React.FC<CourseCardProps> = ({ array }) => {
  const { data: session } = useSession();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const transformText = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const router = useRouter(); // Inicializas el hook useRouter

  const styles: any = {
    Ingeniería: {
      borderClass: "border-red-500 shadow-[0_0_15px_7px_rgba(255,0,0,0.5)]",
    },
    Gestión: {
      borderClass: "border-blue-500 shadow-[0_0_15px_7px_rgba(59,130,255,0.5)]",
    },
    Minería: {
      borderClass:
        "border-orange-500 shadow-[0_0_15px_7px_rgba(249,115,22,0.5)]",
    },
  };
  const [verescogersala, setverescogersala] = useState(false);
  const [datasala, setdatasala] = useState([]);
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  async function iniciarCurso(
    TipoModalidad: any,
    IdProducto: any,
    Sala: any,
    TipoCurso: any
  ) {
    if (TipoModalidad == "Asincrónico") {
      const url = `${array.Curso.replace(
        /\s+/g,
        "-"
      )}/?pid=${encodeURIComponent(
        IdProducto
      )}&pmodalidad=${TipoModalidad}&ptipo=${TipoCurso}`;
      router.push(url);
    }
    if (TipoModalidad == "En Vivo") {
      const response1 = await api.post("/inicio/validarpertenenciasalav2", {
        fproducto_id: IdProducto,
        fusuario_id: session?.user.uid,
      });
      console.log(JSON.stringify(response1.data.data[0][0].count));
      if (response1.data.data[0][0].count == 0) {
        setverescogersala(true);
        const response = await api.post("/inicio/versalasdisponiblesv2", {
          fproducto_id: IdProducto,
        });
        setdatasala(response.data.data[0]);
      } else {
        const url = `${array.Curso.replace(
          /\s+/g,
          "-"
        )}/?pid=${encodeURIComponent(
          IdProducto
        )}&pmodalidad=${TipoModalidad.replace(
          /\s+/g,
          "-"
        )}&psala=${Sala}&ptipo=${TipoCurso}`;
        router.push(url);
      }
    }
  }

  async function integrarsesala(IdSala: any) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Desea inscribirse a la sala?",
      text: "Al inscribirse estara afiliado a esta sala hasta que finalize el curso",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí,inscribirme",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = api.post("/inicio/integrarsesalav2", {
          fsala_id: IdSala,
          fusuario_id: session?.user.uid,
        });
        Swal.fire({
          title: "Se Inscribio con exito!",
          text: "Muchas gracias por la decisión.",
          icon: "success",
        });
        onOpenChange();
        setverescogersala(false);
      }
    });
  }

  return (
    <>
      {/*
            <Link href={{ pathname: `${array.Curso}`, query: { pid: array.IdProducto } }}>
            </Link>*/}

      <div
        className="group flex flex-col relative bg-opacity-100 w-[300px]  h-full !rounded-xl overflow-hidden shadow-md hover:scale-[1.03]
             transition-transform duration-300"
        onClick={onOpen}
      >
        {/* Imagen */}
        <div className="relative h-full">
          <img
            src={environment.baseUrlStorage + array.RutaImagen}
            alt="Curso"
            className="w-[300px] h-full object-cover"
          />

          <AvatarGroup className="absolute bottom-[-0.7rem] left-3 z-[11]">
            {array.RutaImagenPerfil?.map((ruta: any, index: any) => (
              <Avatar key={index} src={ruta} />
            ))}
          </AvatarGroup>

          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {array.Productos.map((item: any, index: number) => (
              <div key={index}>
                {item.TipoModalidad == "Asincrónico" && (
                  <div className="bg-green-500 flex gap-1 items-center py-1 px-2 rounded-xl">
                    <BiSolidVideoRecording className="text-white " />
                    <span className="text-white">Asincrónico</span>
                  </div>
                )}
                {item.TipoModalidad == "En Vivo" && (
                  <div className="bg-red-500 flex  gap-1 items-center  py-1 px-2 rounded-xl">
                    <CiStreamOn className="text-white " />
                    <span className="text-white">En Vivo</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Contenido */}
        <div
          className={`h-full flex flex-col justify-between p-4 text-white rounded-b-2xl rounded-t-none -mt-4 pt-7 ${
            array.Escuela === "Gestión"
              ? "bg-gradient-to-br from-[rgba(255,0,0,0.4)] via-[rgba(22,46,84,0.5)] to-[rgba(255,0,0,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
              : array.Escuela === "Ingeniería"
              ? "bg-gradient-to-br from-[rgba(0,96,254,0.4)] via-[rgba(22,46,84,0.5)] to-[rgba(0,96,254,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
              : "bg-gradient-to-br from-[rgba(249,115,22,0.6)] via-[rgba(22,46,84,0.5)] to-[rgba(255,115,22,0.5)] border-2 border-[rgba(22,46,84,0.4)]"
          }`}
        >
          {/* Título */}
          <div className="flex justify-between">
            <h3 className="font-bold text-lg leading-tight !m-0 line-clamp-2">
              {array.Curso}
            </h3>
            {/* El resto del código (por ejemplo, el Chip) */}
          </div>
          {/* Estadísticas */}
          <div>
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
            <Progress
              classNames={{
                indicator: `${array.Escuela === "Gestión" && "bg-red-500"}  ${
                  array.Escuela === "Ingeniería" && "bg-blue-500"
                } ${array.Escuela === "Minería" && ""}`,
              }}
              value={(array.Progreso / array.ProgresoTotal) * 100}
              aria-label={`Progreso del curso: ${50}%`}
            />
            <div className="flex justify-between">
              <h1 className="text-white my-2 text-base">
                Completado:{" "}
                {Math.round((array.Progreso / array.ProgresoTotal) * 100)}%
              </h1>
              <h1 className="text-white my-2 text-base">
                {array.Progreso}/{array.ProgresoTotal}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
      >
        <ModalContent className="bg-[#131939] flex flex-col">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white py-4 border-b border-white/10">
                {verescogersala ? (
                  <div className="font-bold text-xl flex gap-5 items-center">
                    <div
                      onClick={() => {
                        setverescogersala(false);
                      }}
                      className="cursor-pointer flex flex-3 justify-center items-center gap-2 bg-[#0B0F25] p-2 rounded-xl"
                    >
                      <FaArrowLeft />
                      <span>Atrás</span>
                    </div>
                    <span className="font-bold text-xl">
                      Seleccionar sala del curso:
                    </span>
                  </div>
                ) : (
                  <div className=" flex flex-col items-center">
                    <span className="font-bold text-2xl">
                      Seleccionar Modalidad:{" "}
                    </span>
                    <span className="text-base text-white/80">
                      Elige el tipo de modalidad que prefieres para tu
                      aprendizaje
                    </span>
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 items-center justify-center py-8">
                {!verescogersala ? (
                  array.Productos.map((item: any, index: number) => (
                    <Button
                      key={index}
                      onClick={() => {
                        iniciarCurso(
                          item.TipoModalidad,
                          item.IdProducto,
                          item.Sala,
                          array.TipoCurso
                        );
                      }}
                      className={`w-[70%]  ${
                        item.TipoModalidad == "En Vivo" && "bg-red-500"
                      }
                                             ${
                                               item.TipoModalidad ==
                                                 "Asincrónico" && "bg-[#45BA48]"
                                             }
                                             text-white  py-6 flex justify-between`}
                      variant="flat"
                    >
                      <div>
                        {item.TipoModalidad == "En Vivo" && (
                          <CiStreamOn className="text-2xl text-white" />
                        )}
                        {item.TipoModalidad == "Asincrónico" && (
                          <BiSolidVideoRecording className="text-2xl text-white" />
                        )}
                      </div>

                      {item.TipoModalidad == "En Vivo" && (
                        <>
                          <div className="flex gap-2 items-center">
                            <span className="text-lg">
                              {item.TipoModalidad}
                            </span>
                            {item.Inscrito > 0 ? (
                              <>
                                {" "}
                                <Divider
                                  className="bg-white  h-[1.3rem]"
                                  orientation="vertical"
                                />
                                <span className="text-lg">
                                  Sala {item.Sala}
                                </span>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          <div></div>
                        </>
                      )}
                      {item.TipoModalidad == "Asincrónico" && (
                        <>
                          <span className="text-lg">{item.TipoModalidad}</span>
                          <div></div>
                        </>
                      )}
                    </Button>
                  ))
                ) : (
                  <>
                    {datasala.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer group w-full"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="space-y-1">
                            <h3 className="text-lg font-medium text-white">
                              Sala {item.Sala}
                            </h3>
                            <p className="text-white/70">
                              {new Date(item.FechaInicio).toLocaleDateString(
                                "es-ES",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              integrarsesala(item.IdSala);
                            }}
                            className="bg-[#3B82F6] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#2563EB] transition-colors"
                          >
                            Integrarse
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-white/50 text-sm">Horario</p>
                            <p className="text-white">{item.Horario}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/50 text-sm">Días</p>
                            <p className="text-white capitalize">
                              {item.Frecuencia.split(",")
                                .map((num: string) => {
                                  const dias = [
                                    "domingo",
                                    "lunes",
                                    "martes",
                                    "miércoles",
                                    "jueves",
                                    "viernes",
                                    "sábado",
                                  ];
                                  return dias[parseInt(num.trim())];
                                })
                                .join(", ")}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/50 text-sm">Capacidad</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#3B82F6] rounded-full"
                                  style={{
                                    width: `${
                                      (item.CantidadActualAlumnos /
                                        item.MaximoAlumnos) *
                                      100
                                    }%`,
                                  }}
                                />
                              </div>
                              <span className="text-white text-sm">
                                {item.CantidadActualAlumnos}/
                                {item.MaximoAlumnos}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardCurso;
