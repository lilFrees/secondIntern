import { create } from "zustand";

type State = {
  priceRange: [number, number];
  brands: string[];
};
type Action = {
  clearPriceRange: () => void;
  updatePriceRange: (value: State["priceRange"]) => void;
  addBrand: (newBrand: string) => void;
  removeBrand: (brand: string) => void;
  clearBrands: () => void;
};

export const useFilter = create<State & Action>((set) => ({
  priceRange: [0, 20000],
  brands: [],
  updatePriceRange: (value) => set({ priceRange: value }),
  clearPriceRange: () => set({ priceRange: [0, 20000] }),
  addBrand: (newBrand) =>
    set((state) => ({ brands: [...state.brands, newBrand] })),
  clearBrands: () => set({ brands: [] }),
  removeBrand: (brand) =>
    set((state) => ({ brands: state.brands.filter((brn) => brn !== brand) })),
}));
