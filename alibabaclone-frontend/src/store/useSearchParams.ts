import { create } from 'zustand';

interface SearchParamsState {
  vehicleTypeId?: number;
  fromCityId?: number;
  toCityId?: number;
  startDate: string | null;
  endDate: string | null;
  setParams: (params: Partial<SearchParamsState>) => void;
}

export const useSearchParams = create<SearchParamsState>((set) => ({
  vehicleTypeId: 1,
  fromCityId: undefined,
  toCityId: undefined,
  startDate: null,
  endDate: null,
  setParams: (params) => set((state) => ({ ...state, ...params })),
}));