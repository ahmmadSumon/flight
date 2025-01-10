import { create } from "zustand";

type FlightState = {
  flights: any[];
  setFlights: (flights: any[]) => void;
};

export const useFlightStore = create<FlightState>((set) => ({
  flights: [],
  setFlights: (flights) => set({ flights }),
}));
