import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartProduct {
  id: string;
  Modelo: string;
  Clasificacion: string;
  RutaImagen: string;
  cIdTipoProducto: number;
  Precio: number;
  quantity: number;
  cupon: string;
  descuento: number;
  tipoProducto:string;
  fecha:string;
  idprod:string
}

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductTocart: (product: CartProduct) => void;
  addCupon: (cupon: string, descuento: number, tipodescuento: string) => void;
  removeCupon: (cupon: string) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.Precio + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductTocart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla... tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },


      addCupon: (cupon: string, descuento: number, tipodescuento: string) => {
        const { cart } = get();
        // 2. Se que el producto existe por talla... tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          return { ...item, cupon: cupon, descuento: tipodescuento == "Porcentaje" ? item.Precio * (descuento / 100) : descuento };
        });
        set({ cart: updatedCartProducts });
      },

      removeCupon: (cupon: string) => {
        const { cart } = get();

        // Actualizar los productos que tengan el cupón indicado
        const updatedCartProducts = cart.map((item) => {
          if (item.cupon === cupon) {
            return { ...item, cupon: "", descuento: 0 }; // Limpia el cupón y reinicia el descuento a 0
          }
          return item; // Devuelve el item tal cual si no tiene el cupón
        });

        // Actualizar el estado del carrito
        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id
        );

        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
