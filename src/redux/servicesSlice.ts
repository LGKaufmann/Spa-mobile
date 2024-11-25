import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface servicesState {
  services: string[];
  turnos: string[];
  opiniones: string[];
}

const initialState: servicesState = {
  services: [],
  turnos: [],
  opiniones: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    getServices: (state, action) => {
      state.services = action.payload;
    },
    getTurnos: (state, action) => {
      state.turnos = action.payload;
    },
    getOpiniones: (state, action) => {
      state.opiniones = action.payload;
    },
  },
});

export default servicesSlice;

export const { getServices, getTurnos } = servicesSlice.actions;
