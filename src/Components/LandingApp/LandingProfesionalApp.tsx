import React, { useEffect, useState } from "react";
import axios from "axios";
import Whatsapp from "../../../public/assets/WhatsApp.svg";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userAction"; // Asegúrate de importar la acción de logout
import background from "/assets/background.jpg"; // Importa la imagen de fondo
import SidebarAdminApp from "./SidebarAdminApp";

interface ITurno {
  _id: string;
  usuario: {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    celular: string;
  };
  profesional: {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    celular: string;
    _id: string; // Asegúrate de que tenga el campo id del profesional
  };
  servicio: {
    nombre: string;
    descripcion: string;
    precio: number;
  };
  fecha: string;
  hora: string;
}

const LandingProfesionalApp: React.FC = () => {
  const dispatch = useDispatch();
  const [turnos, setTurnos] = useState<ITurno[]>([]);
  const user = useSelector((state: any) => state.users.user); // Obtenemos los datos del profesional logueado

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get("/servicios/turnos");
        const turnosProfesional = response.data.filter(
          (turno: ITurno) => turno.profesional._id === user?._id // Filtramos los turnos que coincidan con el ID del profesional logueado
        );
        setTurnos(turnosProfesional);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };

    if (user?._id) {
      fetchTurnos();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Llama a la acción de logout
    localStorage.removeItem("token"); // Remueve el token del almacenamiento local
    // Redirige a la página de inicio o a donde desees
  };

  const handleSacarInforme = () => {
    // Implementa la lógica para sacar el informe de servicios aquí
    console.log("Sacar Informe de Serv.");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SidebarAdminApp />

      {/* Contenido principal */}
      <div className="flex-1 p-8 relative">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url(${background})`,
            filter: "brightness(0.5)", // Oscurecer solo la imagen de fondo
          }}
        ></div>

        {/* Contenido principal */}
        <div className="relative flex-1 p-8 bg-white bg-opacity-70 rounded-lg shadow-lg">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#cb0c4f] mb-4 drop-shadow-lg">
              Bienvenido, {user?.nombre + " " + user?.apellido}!
            </h1>
            <p className="text-xl text-gray-700 font-light">
              Aquí puedes ver todos tus turnos reservados.
            </p>
          </header>
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
            {turnos.length === 0 ? (
              <p className="text-center text-gray-600">
                No hay turnos registrados.
              </p>
            ) : (
              <div className="space-y-6">
                {turnos.map((turno) => (
                  <div
                    key={turno._id}
                    className="relative bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300"
                  >
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <a
                        href={`https://wa.me/${turno?.usuario?.celular}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                        aria-label="Contactar por WhatsApp"
                      >
                        <img
                          src={Whatsapp}
                          alt="whatsapp icon"
                          className="h-6 w-6"
                        />
                      </a>
                    </div>

                    <h2 className="text-2xl font-semibold text-[#cb0c4f] mb-2">
                      {turno?.servicio?.nombre}
                    </h2>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Cliente:</span>{" "}
                      {turno?.usuario?.nombre} {turno?.usuario?.apellido}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">DNI:</span>{" "}
                      {turno?.usuario?.dni}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Email:</span>{" "}
                      {turno?.usuario?.email}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Celular:</span>{" "}
                      {turno?.usuario?.celular}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Fecha:</span>{" "}
                      {new Date(turno?.fecha).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Hora:</span> {turno.hora}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Precio:</span> ${turno?.servicio?.precio}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingProfesionalApp;
