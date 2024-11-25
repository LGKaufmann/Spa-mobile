import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // Biblioteca para manejo de fechas
import Whatsapp from "../../../public/assets/Whatsapp.svg";

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

const ListadoClientesPorDia: React.FC = () => {
  const [turnos, setTurnos] = useState<ITurno[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(""); // Estado para la fecha seleccionada
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string>(""); // Estado para el servicio seleccionado
  const [servicios, setServicios] = useState<string[]>([]); // Lista de servicios únicos para el filtro

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get("/servicios/turnos");
        setTurnos(response.data);

        // Extraer servicios únicos para los filtros
        const serviciosUnicos = [
          ...new Set(
            response.data.map((turno: ITurno) => turno.servicio.nombre)
          ),
        ];
        setServicios(serviciosUnicos as string[]);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };

    fetchTurnos();
  }, []);

  // Filtrar los turnos según fecha y servicio
  const turnosFiltrados = turnos.filter((turno) => {
    const coincideFecha = fechaSeleccionada
      ? dayjs(turno.fecha).isSame(fechaSeleccionada, "day")
      : true;
    const coincideServicio = servicioSeleccionado
      ? turno.servicio.nombre === servicioSeleccionado
      : true;
    return coincideFecha && coincideServicio;
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-700 to-[#cb0c4f] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Listado de Clientes por Día
      </h2>

      {/* Filtros */}
      <div className="flex space-x-4 mb-6">
        {/* Filtro de fecha */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Fecha:
          </label>
          <input
            type="date"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Filtro de servicio */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Servicio:
          </label>
          <select
            value={servicioSeleccionado}
            onChange={(e) => setServicioSeleccionado(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">Todos los servicios</option>
            {servicios.map((servicio) => (
              <option key={servicio} value={servicio}>
                {servicio}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de resultados */}
      {turnosFiltrados.length === 0 ? (
        <p className="text-white">
          No hay turnos para la fecha o servicio seleccionados.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {turnosFiltrados.length === 0 ? (
            <p className="text-center text-white">No hay turnos registrados.</p>
          ) : (
            <div className="space-y-6">
              {turnosFiltrados.map((turno) => (
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
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Profesional:</span>{" "}
                    {turno?.profesional?.nombre} {turno.profesional.apellido}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListadoClientesPorDia;
