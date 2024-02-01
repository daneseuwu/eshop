import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItem: () => number;

  getSummaryInformation: () => {
    subtotal: number;
    taxes: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItem: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subtotal = cart.reduce(
          (accumulator, product) =>
            accumulator + product.quantity * product.price,
          0
        );

        const taxes = subtotal * 0.05;
        const total = subtotal + taxes;

        const itemsInCart = cart.reduce(
          (totalItems, item) => totalItems + item.quantity,
          0
        );

        return {
          subtotal,
          taxes,
          total,
          itemsInCart,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // Validar o verificar si el producto ya existe
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
          return;
        }

        // El producto ya existe, incrementar la cantidad
        const updateToCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        set({ cart: updateToCart });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updateCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updateCartProducts = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );
        set({ cart: updateCartProducts });
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
