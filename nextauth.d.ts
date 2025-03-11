import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    IdUsuario: number;
    Usuario: string;
    Nombres: string;
    Apellidos: string;
    Clave: string;
    Correo: string;
    Telefono: string;
    FcIngreso: string;
    FcBaja: string | null;
    Puesto_id: number;
    IdMenu: string;
    IdArea: number;
    Cliente_id: number;
    Premium: number;
    uid: number;
    RutaImagenPerfil: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}