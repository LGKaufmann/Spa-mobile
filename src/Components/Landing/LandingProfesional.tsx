import React, { useEffect, useState } from "react";
import axios from "axios";
import Whatsapp from "../../../public/assets/WhatsApp.svg";

import { useSelector } from "react-redux";

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

const LandingProfesional: React.FC = () => {
  const [turnos, setTurnos] = useState<ITurno[]>([]);
  const { user } = useSelector((state: any) => state.users); // Obtenemos los datos del profesional logueado

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get("/servicios/turnos");
        const turnosProfesional = response.data.filter(
          (turno: ITurno) => turno.profesional._id === user._id // Filtramos los turnos que coincidan con el ID del profesional logueado
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

  return (
    <div className="min-h-screen flex">
      {/* Contenido principal */}
      <div className="flex-1 bg-gradient-to-r from-green-700 to-[#cb0c4f] p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Bienvenido, {user?.nombre + " " + user?.apellido}!
          </h1>
          <p className="text-xl text-white font-light">
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
                    {turno?.usuario?.DNI}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingProfesional;
