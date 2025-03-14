"use server"
import { signIn } from "@/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    
    return "Success";
  } catch (error) {
    return "Error";
  }
}
export const login = async (email: string, Contrasena: string) => {
  try {
    await signIn("credentials", { email, Contrasena });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};
