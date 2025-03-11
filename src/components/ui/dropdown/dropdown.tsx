import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowLeftEndOnRectangleIcon,
  Cog8ToothIcon,
  EnvelopeIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FaBook, FaPen } from "react-icons/fa6";

export default function DropdownComponent() {
  const {
    isOpen: estadoabre,
    onOpen: abre,
    onOpenChange: alterna,
  } = useDisclosure();
  const { data: session } = useSession();
  const [drop, setdrop] = useState(true);

  const handleLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    console.log(session);
  }, []);
console.log("Imagen cargada:", session?.user?.image || session?.user?.RutaImagenPerfil || "Imagen predeterminada");

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-start"
        isOpen={estadoabre}
        onOpenChange={alterna}
        className={clsx(
          "text-white min-w-[18rem] p-4 ",
          drop ? "block" : "hidden"
        )}
        classNames={{ content: "mt-[0.85rem]   bg-colors-dark-blue-ccd " }}
      >
        <DropdownTrigger>
          <User
            onMouseEnter={alterna}
            as="button"
            avatarProps={{
              src: session?.user.name
                ? session?.user.image ??
                  session?.user.RutaImagenPerfil ??
                  "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                : session?.user.RutaImagenPerfil ??
                  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              className:
                "h-12 w-12 max-sm:size-8 border-3 border-white rounded-[50%]",
            }}
            className="transition-transform text-white "
            name={""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions">
          <DropdownItem
            key="login"
            className="text-center hover:!bg-blue-600/30"
          >
            <div className="flex flex-col gap-3 ">
              <div className="flex justify-between">
                <h1 className="text-white font-bold text-xl">
                  Perfil de Usuario
                </h1>
              </div>
              <Divider className="bg-white h-[0.05rem]" />
              <div className="flex gap-5 justify-start items-center">
                {/* Avatar */}
                <Avatar
                  as="button"
                  src={
                    session?.user?.image || // Usa session.user.image si existe
                    session?.user?.RutaImagenPerfil || // Si no, usa session.user.RutaImagenPerfil
                    "https://i.pravatar.cc/150?u=a042581f4e29026024d" // Si no hay ninguna, usa la imagen predeterminada
                  }
                  className="w-16 h-16 border-2 border-colors-cyan-ccd text-large transition-transform text-[var(--color-neutral)]"
                />

                {/* Información del usuario */}
                <div className="flex flex-col">
                  {/* Nombre de usuario o email */}
                  <p className="text-white font-semibold text-xl">
                    {session?.user?.Usuario || session?.user?.email}
                  </p>

                  {/* Detalles adicionales */}
                  <span className="flex gap-1">
                    <span className="text-colors-cyan-ccd">Alumno</span>
                    {session?.user?.Cliente_id === 1 && (
                      <span className="text-white">(Alumno)</span>
                    )}
                    {session?.user?.Puesto_id && (
                      <EnvelopeIcon className="h-5" />
                    )}
                    {session?.user?.Puesto_id}
                  </span>
                </div>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-center hover:!bg-blue-600/30"
          >
            <Link href={"/mis-datos"}>
              <div className="flex items-center gap-3">
                <FaPen className="text-colors-cyan-ccd" />
                <span className="text-white">Editar datos personales</span>
              </div>
            </Link>
          </DropdownItem>
          <DropdownItem key="1" className="text-center hover:!bg-blue-600/30">
            <div className="flex items-center gap-3">
              <FaBook className="text-colors-cyan-ccd" />
              <span className="text-white">Mis Cursos</span>
            </div>
          </DropdownItem>
          <DropdownItem
            key="2"
            className="text-center hover:!bg-blue-600/30"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-3">
              <ArrowLeftEndOnRectangleIcon className="h-5 text-colors-cyan-ccd" />
              <span className="text-white">Cerrar Sesión</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
