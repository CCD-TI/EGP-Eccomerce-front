"use client";
import {
  Avatar,
  AvatarGroup,
  Chip,
  Image,
  Input,
  Pagination,
  Progress,
  Divider,
  Tabs,
  Tab,
  Card,
  Autocomplete,
  AutocompleteItem,
  SelectItem,
  Select,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import {
  RiMedal2Fill,
  RiRadioButtonLine,
  RiRouteFill,
  RiSchoolFill,
} from "react-icons/ri";
import { FaArrowRight, FaBookOpenReader, FaMixer } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useGlobalContext } from "../layout";
import Link from "next/link";
import CourseCard from "@/components/ui/paul/coursecard";
import CardCurso from "@/components/ui/plataforma/CardCurso";
import { GiSecretBook } from "react-icons/gi";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiStreamOn } from "react-icons/ci";
import { BiSolidVideoRecording } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

export default function Page() {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const { data: session } = useSession();
  const mod1 = "online";
  const mod2 = "asincrono";
  const capitalizeFirstWord = (text: any) => {
    const [firstWord, ...rest] = text.split(" ");
    return `${
      firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase()
    } ${rest.join(" ").toLowerCase()}`;
  };
  const [datacursos, setdatacursos] = useState([]);
  const [filteredCursos, setFilteredCursos] = useState<any[]>([]);

  useEffect(() => {
    
    // if (session?.user && session.user.Premium == 1) {
    //   const loadData = async () => {
    //     try {
    //       const responseTipoDocumento = await api.post("/inicio/listarcursosconpremium",
    //         {
    //           fusuario_id: session?.user.uid,
    //         }
    //       );
    //       setdatacursos(responseTipoDocumento.data.data);
    //       setFilteredCursos(responseTipoDocumento.data.data);
    //     } catch (error) {
    //       console.error("Error cargando los datos:", error);
    //     }
    //   };
    //   loadData();
    // }

    if (session?.user && session.user.Premium == 1) {
      const loadData = async () => {
        try {
          const responseTipoDocumento = await api.post(
            "/inicio/listarfullaccessv2",
            {
              fusuario_id: session?.user.uid,
            }
          );
          setdatacursos(responseTipoDocumento.data.data[0]);
          setFilteredCursos(responseTipoDocumento.data.data[0]);
        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }

    if (
      session?.user &&
      (session.user.Premium == 0 || session?.user.Premium == null)
    ) {
      const loadData = async () => {
        try {
          const responseTipoDocumento = await api.post(
            "/inicio/listarcursoxusuariov2",
            {
              fusuario_id: session?.user.uid,
            }
          );
          setdatacursos(responseTipoDocumento.data.data[0]);
          setFilteredCursos(responseTipoDocumento.data.data[0]);
        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }


  }, [session?.user.Usuario]);

  const { nombreGlobal, setNombreGlobal } = useGlobalContext();
  setNombreGlobal("mis-cursos");

  const [vercursosydiplomas, setvercursosydiplomas] = useState(true);
  const [verescuelas, setverescuelas] = useState(false);
  const [verespecialidades, setverespecialidades] = useState(false);
  const [verrutas, setverrutas] = useState(false);
  const [vercursosxruta, setvercursosxruta] = useState(false);
  const [verespecialidadesxescuela, setverespecialidadesxescuela] =
    useState(false);
  const [vercursosxespecialidad, setvercursosxespecialidad] = useState(false);

  const [dataescuelas, setdataescuelas] = useState([]);
  const [dataespecialidades, setdataespecialidades] = useState([]);
  const [datarutas, setdatarutas] = useState([]);
  const [dataespecialidadesxescuela, setdataespecialidadesxescuela] = useState(
    []
  );
  const [datacursosxespecialidad, setdatacursosxespecialidad] = useState([]);
  const [datacursosxruta, setdatacursosxruta] = useState([]);

  const [textotitulo, settextotitulo] = useState("Cursos y Diplomas");
  const [textoescuela, settextoescuela] = useState("");

  async function funescuelas() {
    setvercursosydiplomas(false);
    setverescuelas(true);
    setverespecialidades(false);
    setverrutas(false);
    setvercursosxruta(false);
    setverespecialidadesxescuela(false);
    setvercursosxespecialidad(false);

    settextotitulo("Escuelas");

    const response = await api.post("/inicio/listarescuelasxusuariov2", {
      fusuario_id: session?.user.uid,
    });
    setdataescuelas(response.data.data[0]);
  }
  async function funespecialidades() {
    const response = await api.post(
      "/inicio/listarespecializacionesxusuariov2",
      {
        fusuario_id: session?.user.uid,
      }
    );
    setdataespecialidades(response.data.data[0]);

    setvercursosydiplomas(false);
    setverescuelas(false);
    setverespecialidades(true);
    setverrutas(false);
    setvercursosxruta(false);
    setverespecialidadesxescuela(false);
    setvercursosxespecialidad(false);

    settextotitulo("Especializaciones");
  }
  async function funcursosdiplomas() {
    setvercursosydiplomas(true);
    setverescuelas(false);
    setverespecialidades(false);
    setverrutas(false);
    setvercursosxruta(false);
    setverespecialidadesxescuela(false);
    setvercursosxespecialidad(false);
    settextotitulo("Cursos y Diplomas");
  }
  async function funrutas() {
    const response = await api.post("/inicio/listarrutasxusuariov2", {
      fusuario_id: session?.user.uid,
    });
    setdatarutas(response.data.data[0]);
    setvercursosydiplomas(false);
    setverescuelas(false);
    setverespecialidades(false);
    setverrutas(true);
    setvercursosxruta(false);
    setverespecialidadesxescuela(false);
    setvercursosxespecialidad(false);
    settextotitulo("Rutas");
  }
  //----------
  async function fundeglosarescuela(escuelaid: string, escuela: string) {
    const response = await api.post(
      "/inicio/listarespecializacionesxescuelav2",
      {
        fescuela_id: escuelaid,
        fusuario_id: session?.user.uid,
      }
    );
    setdataespecialidadesxescuela(response.data.data[0]);

    setvercursosydiplomas(false);
    setverescuelas(false);
    setverespecialidades(false);
    setverrutas(false);
    setvercursosxruta(false);
    setverespecialidadesxescuela(true);
    setvercursosxespecialidad(false);

    settextoescuela(escuela);
  }
  async function fundeglosarespecialidad(especializacionid: string) {
    const response = await api.post("/inicio/listarcursosxespecializacionv2", {
      fespecializacion_id: especializacionid,
      fusuario_id: session?.user.uid,
    });
    setdatacursosxespecialidad(response.data.data[0]);

    setvercursosydiplomas(false);
    setverescuelas(false);
    setverespecialidades(false);
    setverrutas(false);
    setvercursosxruta(false);
    setverespecialidadesxescuela(false);
    setvercursosxespecialidad(true);
  }
  async function fundeglosarruta(rutaid: string) {
    const response = await api.post("/inicio/listarcursosxrutasv2", {
      fruta_id: rutaid,
      fusuario_id: session?.user.uid,
    });
    setdatacursosxruta(response.data.data[0]);
    setvercursosydiplomas(false);
    setverescuelas(false);
    setverespecialidades(false);
    setverrutas(false);
    setvercursosxruta(true);
    setverespecialidadesxescuela(false);
    setvercursosxespecialidad(false);
  }
  //-------------
  const styles: any = {
    Ingeniería: {
      borderClass: "border-red-500 shadow-[0_0_15px_7px_rgba(255,0,0,0.5)]",
      background:
        "radial-gradient(circle at top right, rgba(255,0,0,0.8), transparent)",
      button: "bg-red-500 hover:bg-red-700",
      border: "border-red-500",
      src: storageUrl + "/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg",
      degradado: "from-[#0D59D8] to-[#1D4ED8]",
    },
    Gestión: {
      borderClass: "border-blue-500 shadow-[0_0_15px_7px_rgba(59,130,255,0.5)]",
      background:
        "radial-gradient(circle at top right, rgba(0,96,254,0.8), transparent)",
      button: "bg-blue-500 hover:bg-blue-700",
      border: "border-blue-500",
      src:
        storageUrl + "/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg",
      degradado: "from-[#C4060E] to-[#B91C1C]",
    },
    Minería: {
      borderClass:
        "border-orange-500 shadow-[0_0_15px_7px_rgba(249,115,22,0.5)]",
      background:
        "radial-gradient(circle at top right, rgba(249,115,22,0.8), transparent)",
      button: "bg-orange-500 hover:bg-orange-700",
      border: "border-orange-500",
      src: storageUrl + "/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg",
      degradado: "from-[#CD631D] to-[#BC3F0C]",
    },
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = async (key: any) => {
    setSelectedTab(key);
    let response;

    switch (Number(key)) {
      case 1:
        break;
      case 2:
        setvercursosydiplomas(false);
        setverescuelas(true);
        setverespecialidades(false);
        setverrutas(false);
        setvercursosxruta(false);
        setverespecialidadesxescuela(false);
        setvercursosxespecialidad(false);
        if (dataescuelas.length === 0) {
          const response = await api.post("/inicio/listarescuelasxusuariov2", {
            fusuario_id: session?.user.uid,
          });
          setdataescuelas(response.data.data[0]);
        } else {
        }
        break;
      case 3:
        setvercursosydiplomas(false);
        setverescuelas(false);
        setverespecialidades(true);
        setverrutas(false);
        setvercursosxruta(false);
        setverespecialidadesxescuela(false);
        setvercursosxespecialidad(false);
        if (dataespecialidades.length === 0) {
          const response = await api.post(
            "/inicio/listarespecializacionesxusuariov2",
            {
              fusuario_id: session?.user.uid,
            }
          );
          setdataespecialidades(response.data.data[0]);
        } else {
        }
        break;
      case 4:
        setvercursosydiplomas(false);
        setverescuelas(false);
        setverespecialidades(false);
        setverrutas(true);
        setvercursosxruta(false);
        setverespecialidadesxescuela(false);
        setvercursosxespecialidad(false);
        if (datarutas.length === 0) {
          const response = await api.post("/inicio/listarrutasxusuariov2", {
            fusuario_id: session?.user.uid,
          });
          setdatarutas(response.data.data[0]);
        } else {
        }
        break;
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  const pa = Math.ceil(datacursos.length / 12);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Desplazarse al inicio de la página suavemente
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página al buscar
  };

  const paginatedCursos = filteredCursos.slice(
    (currentPage - 1) * 12,
    currentPage * 12
  );
  useEffect(() => {
    const filtered = datacursos.filter((curso: any) => {
      if (!curso || !curso.Curso) return false; // Verifica que curso y curso.Curso existan
      return curso.Curso.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredCursos(filtered);
  }, [searchText, datacursos]);

  const totalPages = Math.ceil(filteredCursos.length / 12);

  return (
    <>
      <div className="px-10 max-sm:px-5 flex flex-col gap-3">
        <div className="mt-3 flex flex-col gap-3">
          <div>
            <h1 className="text-[#D9DADB] text-lg">Actualmente</h1>
            <h1 className="text-white text-2xl font-bold">Mis {textotitulo}</h1>
          </div>
        </div>
        <Tabs
          aria-label="Tabs variants"
          variant={"solid"}
          color={"primary"}
          classNames={{
            tabList:
              "!bg-[#131939] border-blue-500/50 border-1 max-sm:grid grid-cols-2",
            tabContent: "!text-white",
            cursor: "bg-[#007FEE]",
          }}
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
        >
          <Tab
            key="1"
            title={
              <div className="flex items-center gap-2 ">
                {" "}
                <GiSecretBook />
                <span>Curso | Diploma</span>
              </div>
            }
          >
            <Card className=" bg-transparent rounded-none relative bottom-[7px] ">
              {paginatedCursos.length > 0 ? (
                <>
                  <div className="flex gap-3 ">
                    <Input
                      type="text"
                      className="w-[30%] max-sm:w-full"
                      placeholder="Búsqueda"
                      startContent={<IoMdSearch />}
                      value={searchText}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="size-full flex flex-wrap justify-center mx-auto px-10 py-10 max-sm3:!p-3 gap-10 min-w-0">
                    {paginatedCursos.map((item: any, index) => (
                      <CardCurso key={index} array={item} />
                    ))}
                  </div>

                  <Pagination
                    showControls
                    initialPage={1}
                    total={totalPages}
                    className="mt-10"
                    classNames={{
                      wrapper: "m-auto",
                      cursor: "bg-[#007FEE] !text-white",
                    }}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </>
              ) : (
                <>
                  <div className="text-white/50 text-[1.60rem] text-center mt-5">
                    Aún no tienes cursos o diplomas comprados.
                  </div>
                </>
              )}
            </Card>
          </Tab>
          <Tab
            key="2"
            title={
              <div className="flex items-center gap-2">
                {" "}
                <RiSchoolFill />
                <span>Escuelas</span>
              </div>
            }
          >
            {dataescuelas.length > 0 ? (
              ""
            ) : (
              <div className="text-white/50 text-[1.60rem] text-center mt-3">
                Aún no tienes escuelas compradas.
              </div>
            )}
            <Card className="h-full w-full grid grid-cols-4 max-[1600px]:grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-2 max-sm:grid-cols-1  gap-14 bg-transparent">
              {verescuelas &&
                dataescuelas.map((item: any, index) => (
                  <div
                    key={index}
                    className="group relative h-[12rem]"
                    onClick={() => {
                      fundeglosarescuela(item.IdEscuela, item.Escuela);
                    }}
                  >
                    <div
                      className={`absolute h-full -inset-0.5 bg-gradient-to-r ${
                        styles[item.Escuela].degradado
                      }  blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
                    />
                    <div className="relative bg-transparent rounded-lg p-6 h-full border border-white/10">
                      <div className="flex flex-col gap-4 justify-start">
                        <Image
                          removeWrapper
                          src={styles[item.Escuela].src}
                          height={45}
                          className="w-fit"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {item.Escuela}
                          </h3>
                          <p className="text-sm text-white/60">
                            {item.Descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {verespecialidadesxescuela ? (
                dataespecialidadesxescuela.map((item: any, index) => (
                  <div
                    key={index}
                    className="group relative h-[12rem]"
                    onClick={() => {
                      fundeglosarespecialidad(item.IdEspecializacion);
                    }}
                  >
                    <div
                      className={`absolute h-full -inset-0.5  opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
                    />
                    <div
                      className={`relative bg-gradient-to-r ${styles[textoescuela].degradado}  backdrop-blur-md rounded-lg p-6 h-full border border-white/10`}
                    >
                      <div className="flex flex-col gap-4 justify-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {item.Especializacion}
                          </h3>
                          <p className="text-sm text-white/60">
                            {item.Descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
              {vercursosxespecialidad ? (
                datacursosxespecialidad.map((item: any, index) => (
                  <CardCurso key={index} array={item} />
                ))
              ) : (
                <></>
              )}
            </Card>
          </Tab>
          <Tab
            key="3"
            title={
              <div className="flex items-center gap-2">
                {" "}
                <RiMedal2Fill />
                <span>Especializaciones</span>
              </div>
            }
          >
            {dataespecialidades.length > 0 ? (
              ""
            ) : (
              <div className="text-white/50 text-[1.60rem] text-center mt-3">
                Aún no tienes especializaciones compradas.
              </div>
            )}

            <Card className="size-full bg-transparent">
              <div className="flex flex-wrap justify-center mx-auto px-10 py-10 max-sm3:!p-3 gap-8">
                {verespecialidades &&
                  dataespecialidades.map((item: any, index) => (
                    <div
                      key={index}
                      className="group relative h-fit w-[300px] max-sm:w-full overflow-hidden"
                      onClick={() => {
                        fundeglosarespecialidad(item.IdEspecializacion);
                      }}
                    >
                      <div
                        className={`absolute h-full -inset-0.5  opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
                      />
                      <div
                        className={`relative bg-[#131939]  backdrop-blur-md rounded-lg p-6 h-full border border-white/10`}
                      >
                        <div className="flex flex-col gap-4 justify-start">
                          <h3 className="text-lg font-semibold text-white">
                            {item.Especializacion}
                          </h3>
                          <p className="text-sm  text-white/60 p">
                            {item.Descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {vercursosxespecialidad ? (
                  datacursosxespecialidad.map((item: any, index) => (
                    <CardCurso key={index} array={item} />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Card>
          </Tab>
          <Tab
            key="4"
            title={
              <div className="flex items-center gap-2">
                <RiRouteFill />
                <span>Rutas</span>
              </div>
            }
          >
            {datarutas.length > 0 ? (
              ""
            ) : (
              <div className="text-white/50 text-[1.60rem] text-center mt-3">
                Aún no tienes rutas compradas.
              </div>
            )}

            <Card className="h-full w-full grid grid-cols-4 max-[1600px]:grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-2 max-sm:grid-cols-1  gap-14 bg-transparent">
              {verrutas &&
                datarutas.map((item: any, index) => (
                  <div
                    key={index}
                    className="group relative h-[18rem]"
                    onClick={() => {
                      fundeglosarruta(item.IdRuta);
                    }}
                  >
                    <div className="relative bg-black rounded-lg p-6 h-full border border-white/10">
                      <div className="flex flex-col gap-4  justify-between">
                        <Image
                          removeWrapper
                          src={item.ImagenPortada}
                          height={100}
                          className="w-full rounded-none"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {item.Ruta}
                          </h3>
                          <p className="text-sm text-white/60">
                            {item.Descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {vercursosxruta ? (
                datacursosxruta.map((item: any, index) => (
                  <CardCurso key={index} array={item} />
                ))
              ) : (
                <></>
              )}
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
