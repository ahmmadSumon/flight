import api from "./api";

export const getFlights = (query: string) => api.get(`/flight?${query}`);
export const createFlight = (data: any) => api.post("/flight/create", data);
export const getFlightById = (id: string) => api.get(`/flight/${id}`);
