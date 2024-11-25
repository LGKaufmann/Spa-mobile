import React, { useEffect, useState } from "react";
import axios from "axios";
import Whatsapp from "/assets/Whatsapp.svg";
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
  };
  servicio: {
    nombre: string;
    descripcion: string;
    precio: number;
  };
  fecha: string;
  hora: string;
}

const LandingAdminApp: React.FC = () => {
  const [turnos, setTurnos] = useState<ITurno[]>([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get("/servicios/turnos");
        setTurnos(response.data);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };

    fetchTurnos();
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SidebarAdminApp />

      {/* Contenido principal */}
      <div className="flex-1 p-6 bg-green-700">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-6">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#cb0c4f] mb-4 drop-shadow-lg">
              Bienvenido a la App, Administrador!
            </h1>
            <p className="text-xl text-white font-light">
              Aquí puedes ver todos los turnos reservados.
            </p>
          </header>
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
                    <span className="font-semibold">Servicio:</span>{" "}
                    {turno?.servicio?.descripcion} - ${turno.servicio.precio}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Profesional:</span>{" "}
                    {turno?.profesional?.nombre} {turno.profesional.apellido}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingAdminApp;
