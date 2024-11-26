import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import appBackground from "/assets/background.jpg"; // Fondo de la aplicación
import { useDispatch } from "react-redux"; // Importa useDispatch
import { logout } from "../../redux/userSlice"; // Asegúrate de que esta ruta sea correcta

const AplicacionWeb = () => {
  const navigate = useNavigate(); // Usa useNavigate para obtener la función de navegación
  const dispatch = useDispatch(); // Usa useDispatch para despachar acciones

  const handleLogout = () => {
    dispatch(logout()); // Despacha la acción de cierre de sesión
    navigate("/"); // Redirige al inicio después de cerrar sesión
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${appBackground})` }} // Aplicar fondo de la aplicación
      >
        <div className="w-full h-full bg-black opacity-45" />{" "}
        {/* Opacidad ajustada */}
      </div>

      {/* Botón para volver al inicio */}
      <button
        onClick={() => navigate("/")} // Redirige al inicio
        className="absolute top-5 left-5 w-40 h-10 bg-[#cb0c4f] rounded-3xl text-base text-white font-semibold transition-transform transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
      >
        Volver al Inicio
      </button>

      <div className="relative z-10 p-10 rounded-lg mx-auto h-fit w-3/4 md:w-1/2 text-center">
        <h1
          className="mb-2"
          style={{
            fontFamily: "'Playball', cursive", // Tipografía utilizada
            fontWeight: "700", // Peso de la fuente
            fontSize: "3.5rem", // Tamaño ajustado
            color: "#cb0c4f",
          }}
        >
          Bienvenido a la Aplicación Web
        </h1>
        <p
          className="mb-4"
          style={{
            fontFamily: "'Playball', cursive", // Tipografía utilizada
            fontWeight: "400", // Peso de la fuente
            fontSize: "1.8rem", // Tamaño ajustado
            color: "#cb0c4f",
          }}
        >
          Selecciona el tipo de usuario para iniciar sesión:
        </p>

        {/* Enlaces a los tipos de usuario */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/app-login"
            className="bg-[#cb0c4f] text-white font-semibold py-2 px-4 rounded shadow hover:bg-pink-600"
          >
            Cliente
          </Link>
          <Link
            to="/loginProfesionalesApp"
            className="bg-[#cb0c4f] text-white font-semibold py-2 px-4 rounded shadow hover:bg-pink-600"
          >
            Profesional
          </Link>
          <Link
            to="/loginSecretariaApp"
            className="bg-[#cb0c4f] text-white font-semibold py-2 px-4 rounded shadow hover:bg-pink-600"
          >
            Secretario/a
          </Link>
          <Link
            to="/loginPersonal"
            className="bg-[#cb0c4f] text-white font-semibold py-2 px-4 rounded shadow hover:bg-pink-600"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AplicacionWeb;
