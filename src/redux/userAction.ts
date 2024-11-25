import { Dispatch } from "redux";
import axios from "../../utils/axios";
import {
  login,
  logout,
  profesionales,
  register,
  setLoading,
  userData,
} from "./userSlice";
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

const loginUser = (user: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post("/usuarios/login", user);
      Swal.fire({
        icon: "success",
        text: "Sesión iniciada correctamente",
      });
      dispatch(login(data));
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        text: "Usuario o contraseña incorrectos",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      Toast.fire({
        icon: "success",
        text: "Sesión cerrada correctamente",
      });
      return dispatch(logout());
    } catch (error) {
      console.error((error as any).message);
    }
  };
};

const registerUser = (user: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post("/usuarios/crear", user);
      dispatch(register(data));
      Toast.fire({
        icon: "success",
        text: "Registro exitoso!",
      });
    } catch (error: any) {
      console.error((error as any).message);
      Toast.fire({
        icon: "error",
        text: `${error.response.data.message}`,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const fetchUserData = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.get("/usuarios/datos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      dispatch(userData(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};
const obtenerProfesionales = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get("/usuarios/profesionales", {});

      dispatch(profesionales(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export {
  registerUser,
  loginUser,
  logoutUser,
  fetchUserData,
  obtenerProfesionales,
};
