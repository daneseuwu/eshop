import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstname: string;
    lastname: string;
    address: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    instructions: string;
  };

  setAddress: (address: State["address"]) => void;
}
export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstname: "",
        lastname: "",
        address: "",
        postalCode: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        instructions: "",
      },
      setAddress: (address) => set({ address }),
    }),

    {
      name: "address-user",
    }
  )
);
