"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { environment } from "@/environments/environment";
import { Spinner } from "@heroui/react";

export default function ContactForm() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    organizacion: "",
    cargo: "",
    movil: "",
    correo: "",
    mensaje: "",
  });

  const ValidateField = (name: string, value: string) => {
    switch (name) {
      case "nombres":
      case "apellidos":
      case "organizacion":
      case "cargo":
        return value.trim().length >= 2
          ? ""
          : `el campo ${
              name.charAt(0).toUpperCase() + name.slice(1)
            } debe tener al menos 2 caracteres`;
      case "movil":
        return /^[0-9]{9}$/.test(value.trim())

        ? "" 
        : "Número movil invalido";

      case "correo":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Correo invalidado verificar por favor";

      case "mensaje":
        return value.trim().length >= 10
          ? ""
          : "El mensaje debe tener al menos 10 caracteres";

      default:
        return "";
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate individual field
    const fieldError = ValidateField(name, value);

    // Update errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (fieldError) {
        newErrors[name] = fieldError;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submission
    const formErrors: { [key: string]: string } = {};
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      const error = ValidateField(key, formData[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    // If there are errors, set them and prevent submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${environment.baseUrl}/inicio/EnviarCorreoCorp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        Swal.fire({
          title: data.message,
          icon: "success",
        });

        // Reset form after successful submission
        setFormData({
          nombres: "",
          apellidos: "",
          organizacion: "",
          cargo: "",
          movil: "",
          correo: "",
          mensaje: "",
        });
        setErrors({});
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || data.message || "Ocurrió un error en el servidor",
          icon: "error",
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo procesar la solicitud. Intenta más tarde.";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
      <img
        src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Fondos/freepik__retouch__679351%202.png"
        alt="Trabaja con nosotros"
        className="absolute right-0 top-0 h-full object-cover opacity-80"
      />
      <img
        src="/Multimedia/Imagen/ccdcorp/Ellipseizquierda.png"
        alt="Trabaja con nosotros"
        className="absolute left-0 top-0 h-full object-cover opacity-80"
      />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10     p-4 md:p-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="relative flex flex-col justify-start w-[40%] max-sm:w-full max-lg:w-[60%] rounded-xl  p-8 gap-4 ">
            {/* Form Section */}
            <div className="flex flex-col justify-center items-center">
              <h1 className=" text-[2.5rem] max-sm:text-4xl font-bold text-colors-cyan-ccd">
                ¿Necesitas
              </h1>
              <h2 className=" text-[2.5rem] max-sm:text-4xl font-bold text-white mb-6 neon-white">
                ASESORÍAS?
              </h2>
            </div>
            <p className="text-gray-200 text-lg mb-8">
              Escríbenos tu consulta y nuestros asesores se contactarán contigo.
            </p>
            <div className="w-full z-10 bg-black/20 backdrop-blur p-10 border border-colors-cyan-ccd rounded-xl  ">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="nombres"
                    placeholder="Nombres *"
                    
                    className={`w-full p-3 rounded-xl bg-white/10 border ${
                      errors.nombres ? "border-red-500" : "border-white/20"
                    } text-white placeholder-gray-300 focus:outline-none focus:border-[#00ffd5]`}
                    onChange={handleChange}
                    value={formData.nombres}
                  />
                  {errors.nombres && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nombres}
                    </p>
                  )}
                </div>

                {/* Apellidos Input */}
                <div>
                  <input
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos *"
                    
                    className={`w-full p-3 rounded-xl bg-white/10 border ${
                      errors.apellidos ? "border-red-500" : "border-white/20"
                    } text-white placeholder-gray-300 focus:outline-none focus:border-[#00ffd5]`}
                    onChange={handleChange}
                    value={formData.apellidos}
                  />
                  {errors.apellidos && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.apellidos}
                    </p>
                  )}
                </div>

                {/* Organizacion Input */}
                <div>
                  <input
                    type="text"
                    name="organizacion"
                    placeholder="Organización *"
                    
                    className={`w-full p-3 rounded-xl bg-white/10 border ${
                      errors.organizacion ? "border-red-500" : "border-white/20"
                    } text-white placeholder-gray-300 focus:outline-none focus:border-[#00ffd5]`}
                    onChange={handleChange}
                    value={formData.organizacion}
                  />
                  {errors.organizacion && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.organizacion}
                    </p>
                  )}
                </div>

                {/* Cargo Input */}
                <div>
                  <input
                    type="text"
                    name="cargo"
                    placeholder="Cargo *"
                    
                    className={`w-full p-3 rounded-xl bg-white/10 border ${
                      errors.cargo ? "border-red-500" : "border-white/20"
                    } text-white placeholder-gray-300 focus:outline-none focus:border-[#00ffd5]`}
                    onChange={handleChange}
                    value={formData.cargo}
                  />
                  {errors.cargo && (
                    <p className="text-red-500 text-sm mt-1">{errors.cargo}</p>
                  )}
                </div>

                {/* Mobile and Email Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Movil Input */}
                  <div>
                    <input
                      type="tel"
                      name="movil"
                      placeholder="Móvil *"
                      
                      className={`w-full p-3 rounded-xl bg-white/10 border ${
                        errors.movil ? "border-red-500" : "border-white/20"
                      } text-white placeholder-gray-300 focus:outline-none focus:border-[#00ffd5]`}
                      onChange={handleChange}
                      value={formData.movil}
                    />
                    {errors.movil && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.movil}
                      </p>
                    )}
                  </div>

                  {/* Correo Input */}
                  <div>
                    <input
                      type="email"
                      name="correo"
                      placeholder="Correo *"
                      
                      className={`w-full p-3 rounded-xl bg-white/10 border ${
                        errors.correo ? "border-red-500" : "border-white/20"
                      } text-white placeholder-gray-300 focus:outline-none focus:border-[#00ffd5]`}
                      onChange={handleChange}
                      value={formData.correo}
                    />
                    {errors.correo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.correo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mensaje Textarea */}
                <div>
                  <textarea
                    name="mensaje"
                    placeholder="Escribe aquí tu consulta *"
                    
                    rows={3}
                    className={`w-full p-3 rounded-xl bg-white/10 border ${
                      errors.mensaje ? "border-red-500" : "border-white/20"
                    } text-white placeholder-gray-300 focus:outline-none focus:border-[#00ffd5] resize-none`}
                    onChange={handleChange}
                    value={formData.mensaje}
                  />
                  {errors.mensaje && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mensaje}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[#00ffd5] text-gray-900 px-8 py-2 text-xl  rounded-xl font-medium hover:bg-[#00e6c1] transition-colors flex gap-2 items-center"
                  disabled={isLoading} // Deshabilitar el botón mientras carga
                >
                  {isLoading ? "Enviando..." : "¡Enviar! "}{" "}
                  {isLoading && (
                    <div className="flex justify-center">
                      <Spinner color="white" />
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
