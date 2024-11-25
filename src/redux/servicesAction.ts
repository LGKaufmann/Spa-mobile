import { Dispatch } from "redux";
import axios from "../../utils/axios";
import { getServices } from "./servicesSlice";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
  customClass: {
    popup: "my-toast",
  },
});

const getServicesAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get("/servicios/");
      dispatch(getServices(data));
    } catch (error: any) {
      console.log(error);
    }
  };
};

const crearTurno = (turno: any, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post("/servicios/turno", turno, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        text: "Servicio reservado correctamente. Un empleado del spa se estará comunicando con usted vía email o WhatsApp.",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        text: "El turno ya está reservado para esta fecha y hora.",
      });
    }
  };
};
const crearOpinion = (text: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post("/servicios/opiniones", text);
      Swal.fire({
        icon: "success",
        text: "Opinion enviada correctamente.",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        text: "Error al enviar la opinion.",
      });
    }
  };
};

export { getServicesAction, crearTurno, crearOpinion };
