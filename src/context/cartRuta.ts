import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartRuta {
  IdRuta: number;
  Ruta: string;
  ImagenPortada: string;
  Cursos: { Curso: string; Modalidad: string }[];
  PrecioTotal: number;
  quantity: number;
  cupon: string;
  descuento: number;
}

interface State {
  cart: CartRuta[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addRutaToCart: (ruta: CartRuta) => void;
  addCupon: (cupon: string, descuento: number, tipodescuento: string) => void;
  removeCupon: (cupon: string) => void;
  removeRutaFromCart: (ruta: CartRuta) => void;
  clearCart: () => void;
}

export const useCartRutaStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, ruta) => (ruta.PrecioTotal - ruta.descuento) * ruta.quantity + subTotal,
          0
        );
        const tax = subTotal * 0.15; // Impuesto del 15%
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addRutaToCart: (ruta: CartRuta) => {
        const { cart } = get();
        const rutaInCart = cart.some((item) => item.IdRuta === ruta.IdRuta);
      
        if (!rutaInCart) {
          set({ cart: [...cart, { ...ruta, quantity: 1 }] });
        } else {
          const updatedCart = cart.map((item) =>
            item.IdRuta === ruta.IdRuta ? { ...item, quantity: item.quantity + 1 } : item
          );
          set({ cart: updatedCart });
        }
      },
      

      addCupon: (cupon: string, descuento: number, tipodescuento: string) => {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          const descuentoAplicado =
            tipodescuento === "Porcentaje" ? item.PrecioTotal * (descuento / 100) : descuento;
          return { ...item, cupon, descuento: descuentoAplicado };
        });
        set({ cart: updatedCart });
      },

      removeCupon: (cupon: string) => {
        const { cart } = get();
        const updatedCart = cart.map((item) =>
          item.cupon === cupon ? { ...item, cupon: "", descuento: 0 } : item
        );
        set({ cart: updatedCart });
      },

      removeRutaFromCart: (ruta: CartRuta) => {
        const { cart } = get();
        const updatedCart = cart.filter((item) => item.IdRuta !== ruta.IdRuta);
        set({ cart: updatedCart });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),


    {
      name: "ruta-cart",
    }
  )
);
