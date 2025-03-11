import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import axios from "axios";
import { environment } from "@/environments/environment";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"

const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
});

export const authConfig: NextAuthConfig = {
    providers: [
        // Proveedor de credenciales (email y contraseña)
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string(), Contrasena: z.string() })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, Contrasena } = parsedCredentials.data;

                try {
                    const response = await api.post("/auth/buscarUsuario", {
                        pUsuario: email,
                    });

                    const user = response.data.data[0][0];

                    if (!user) return null; // Usuario no existe
                    if (Contrasena !== user.Clave) return null; // Contraseña incorrecta

                    const { Contrasena: _, ...rest } = user; // Eliminamos la clave antes de devolverlo
                    return rest;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),

        // Proveedor de Google
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // Proveedor de Facebook
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        // Callback para manejar el inicio de sesión
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && profile) {
                try {
                    const userEmail = profile.email;
                    if (!userEmail) {
                        console.error("No email found in Google profile");
                        return false;
                    }

                    console.log("Google sign in attempt:", { email: userEmail });

                    const response = await api.post("/auth/buscarUsuario", {
                        pUsuario: userEmail,
                    });

                    let usuarioExistente = response.data.data?.[0]?.[0];

                    if (!usuarioExistente) {
                        console.log("Creating new user in DB:", { nombres: profile.given_name, email: userEmail });

                        const nuevoUsuario = await api.post("/auth/crearUsuariov2", {
                            pnombres: profile.given_name,
                            papellidos: profile.family_name || "Google",
                            pcorreo: userEmail,
                            pimg: profile.picture,
                            pClave: null, // No necesita clave si es Google
                        });

                        // Buscar nuevamente el usuario creado
                        const newUserResponse = await api.post("/auth/buscarUsuario", {
                            pUsuario: userEmail,
                        });
                        usuarioExistente = newUserResponse.data.data?.[0]?.[0];
                    }

                    if (!usuarioExistente) {
                        console.error("Failed to create/find user in DB");
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.error("Error in Google sign in:", error);
                    return false;
                }
            }

            // Lógica para Facebook
            if (account?.provider === "facebook" && profile) {
                try {
                    const userEmail = profile.email;
                    if (!userEmail) {
                        console.error("No email found in Facebook profile");
                        return false;
                    }

                    console.log("Facebook sign in attempt:", { email: userEmail });

                    const response = await api.post("/auth/buscarUsuario", {
                        pUsuario: userEmail,
                    });

                    let usuarioExistente = response.data.data?.[0]?.[0];

                    if (!usuarioExistente) {
                        console.log("Creating new user in DB:", { nombres: profile.name, email: userEmail });

                        const nuevoUsuario = await api.post("/auth/crearUsuariov2", {
                            pnombres: profile.name || "Facebook User", // Facebook no siempre devuelve nombres separados
                            papellidos: "Facebook", // Facebook no devuelve apellidos por separado
                            pcorreo: userEmail,
                            pimg: profile.picture?.data?.url || null, // Facebook devuelve la imagen en un objeto
                            pClave: null, // No necesita clave si es Facebook
                        });

                        // Buscar nuevamente el usuario creado
                        const newUserResponse = await api.post("/auth/buscarUsuario", {
                            pUsuario: userEmail,
                        });
                        usuarioExistente = newUserResponse.data.data?.[0]?.[0];
                    }

                    if (!usuarioExistente) {
                        console.error("Failed to create/find user in DB");
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.error("Error in Facebook sign in:", error);
                    return false;
                }
            }

            return true;
        },

        // Callback para personalizar el token
        async jwt({ token, user, account }) {
            if (user) {
                // Si el usuario inició sesión con Google o Facebook, buscamos la data en la BD
                if (account?.provider === "google" || account?.provider === "facebook") {
                    try {
                        const response = await api.post("/auth/buscarUsuario", {
                            pUsuario: user.email,
                        });

                        const userDB = response.data.data?.[0]?.[0];

                        if (userDB) {
                            token.data = userDB; // Guardamos la info del usuario de la BD en el token
                        }
                    } catch (error) {
                        console.error("Error fetching user from DB:", error);
                    }
                } else {
                    token.data = user; // Si fue con credenciales, guardamos el usuario normal
                }
            }

            return token;
        },

        // Callback para personalizar la sesión
        async session({ session, token }) {
            session.user = token.data as any;
            return session;
        },
    },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);