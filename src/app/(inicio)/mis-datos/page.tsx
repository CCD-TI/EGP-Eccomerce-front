"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Autocomplete,
  AutocompleteItem,
  DateInput,
  Button,
} from "@nextui-org/react";
vimport withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import { environment } from "@/environments/environment";
import { CalendarDate } from "@internationalized/date";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ubigeo from "@/components/ui/paul/data/ubigeo.json";
import { I18nProvider } from "@react-aria/i18n";
// Axios
const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    Nombres: "",
    Apellidos: "",
    TipoDocumento_id: null,
    NroDocumento: "",
    Pais_id: null,
    Telefono: "",
    Direccion: "",
    FcNacimiento: null,
    Genero: null,
  });
  const [selected, setSelected] = useState("photos");
  const [dataSelectTipoDocumento, setDataSelectTipoDocumento] = useState([]);
  const [dataSelectPais, setDataSelectPais] = useState([]);
  const [dataMisDatos, setDataMisDatos] = useState<any>(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirige al inicio si no está autenticado
    }
  }, [status, router]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const responseTipoDocumento = await api.post(
          "/inicio/listarSelectTipoDocumento",
          { ptipodocumento: "Identidad" }
        );
        setDataSelectTipoDocumento(responseTipoDocumento.data.data[0]);

        const responsePais = await api.post("/inicio/listarPais", {});
        setDataSelectPais(responsePais.data.data[0]);

        if (session?.user.Usuario) {
          const response = await api.post("/inicio/listarMisDatos", {
            fusuario: session?.user.Usuario,
          });
          const userData = response.data.data[0][0];
          setDataMisDatos(userData);
          setFormData({
            Nombres: userData.Nombres,
            Apellidos: userData.Apellidos,
            TipoDocumento_id: userData.TipoDocumento_id,
            NroDocumento: userData.NroDocumento,
            Pais_id: userData.Pais_id,
            Telefono: userData.Telefono,
            Direccion: userData.Direccion,
            FcNacimiento: userData.FcNacimiento,
            Genero: userData.Genero,
          });
        }
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };
    loadData();
  }, [session?.user.Usuario]);

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar cambios en los selects y autocompletados
  const handleSelectChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async () => {
    try {
      console.log("FORMDATA: ", formData);
      const response = await api.post("/inicio/actualizarEntidad", {
        ...formData,
        Usuario: session?.user.Usuario,
        IdUsuario: session?.user.uid,
      });

      console.log("RESPONSITO: ", response);

      if (response.data.ok) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: "¡Actualización realizada con Exito!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ir al inicio",
        });
      } else {
        Swal.fire("Error al actualizar los datos: " + response.data.msg);
      }
    } catch (error: any) {
      console.error("Error al actualizar los datos:", error);
      Swal.fire("Error al actualizar los datos: ", error);
    }
  };

  return (
    <div className="flex w-full !h-fit flex-col m-auto py-6 bg-double-esferas2">
      <div className="max-w-[100rem] py-16 px-6 w-full mx-auto ">
        <div className="w-[90%] mx-auto ">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key.toString())}
            classNames={{
              base: " flex justify-center items-center text-red-500 !bg-transparent",
              cursor: "bg-white/20 text-white ",
              tabContent: "!text-white !bg-transparent",
              tab: "!text-blue-900 !bg-transparent",
              wrapper: "text-blue-500 !bg-transparent",
              panel: "text-blue-500 !bg-transparent",
              tabList: "text-green-500 !bg-transparent",
            }}
            variant="bordered"
          >
            <Tab key="photos" title="Datos Personales">
              <Card className="bg-white">
                <CardBody className="flex flex-col gap-5">
                  <div className="flex gap-10">
                    <Input
                      type="text"
                      label="Nombres"
                      variant="bordered"
                      name="Nombres"
                      value={formData.Nombres}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Escribe tu Nombre"
                    />
                    <Input
                      type="text"
                      label="Apellidos"
                      variant="bordered"
                      name="Apellidos"
                      value={formData.Apellidos}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Escribe tu Apellido"
                    />
                  </div>
                  <div className="flex gap-10">
                    <Autocomplete
                      label="Tipo de Documento"
                      variant="bordered"
                      defaultItems={dataSelectTipoDocumento}
                      placeholder="Seleccionar la opción"
                      selectedKey={formData.TipoDocumento_id}
                      onSelectionChange={(value) =>
                        handleSelectChange("TipoDocumento_id", value)
                      }
                    >
                      {(item: any) => (
                        <AutocompleteItem
                          key={item.IdTipoDocumento}
                          value={item.IdTipoDocumento}
                        >
                          {item.TipoDocumento}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <Input
                      type="text"
                      label="N° de Documento"
                      variant="bordered"
                      name="NroDocumento"
                      value={formData.NroDocumento}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Escribe tu Número de documento"
                    />
                  </div>
                  <div className="flex gap-10">
                    <Autocomplete
                      label="País"
                      variant="bordered"
                      defaultItems={dataSelectPais}
                      placeholder="Seleccionar la opción"
                      selectedKey={formData.Pais_id}
                      onSelectionChange={(value) =>
                        handleSelectChange("Pais_id", value)
                      }
                    >
                      {(item: any) => (
                        <AutocompleteItem key={item.IdPais} value={item.IdPais}>
                          {item.Nombre}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <Input
                      type="text"
                      label="Teléfono"
                      variant="bordered"
                      name="Telefono"
                      value={formData.Telefono}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Escribe tu Teléfono"
                    />
                  </div>
                  <div className="flex gap-10">
                    <Input
                      type="text"
                      label="Dirección"
                      variant="bordered"
                      name="Direccion"
                      value={formData.Direccion || ""}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Escribe tu Dirección"
                    />
                  </div>
                  <div className="flex gap-10">
                    <I18nProvider locale="es-ES">
                      <DateInput
                        label="Fecha de nacimiento"
                        variant="bordered"
                        placeholderValue={
                          formData.FcNacimiento
                            ? new CalendarDate(
                                new Date(formData.FcNacimiento).getFullYear(),
                                new Date(formData.FcNacimiento).getMonth() + 1,
                                new Date(formData.FcNacimiento).getDate()
                              )
                            : undefined
                        }
                        onChange={(value) => {
                          if (value) {
                            const date = value.toDate("UTC");
                            const formattedDate = date
                              .toISOString()
                              .split("T")[0];
                            handleSelectChange("FcNacimiento", formattedDate);
                          } else {
                            handleSelectChange("FcNacimiento", null);
                          }
                        }}
                        className="max-w-sm"
                      />
                    </I18nProvider>
                    <Autocomplete
                      label="Género"
                      variant="bordered"
                      defaultItems={[
                        { Genero: "Masculino" },
                        { Genero: "Femenino" },
                        { Genero: "Prefiero no decirlo" },
                      ]}
                      placeholder="Seleccionar la opción"
                      selectedKey={formData.Genero}
                      onSelectionChange={(value) =>
                        handleSelectChange("Genero", value)
                      }
                    >
                      {(item: any) => (
                        <AutocompleteItem key={item.Genero} value={item.Genero}>
                          {item.Genero}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>
                  <Button
                    color="primary"
                    variant="bordered"
                    className="max-w-52 m-auto"
                    onClick={handleSubmit}
                  >
                    Guardar
                  </Button>
                </CardBody>
              </Card>
            </Tab>
            {/* <Tab key="music" title="Datos de Cuenta">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
