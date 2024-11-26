import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Whatsapp from "../../../public/assets/Whatsapp.svg";
import SidebarAdminApp from "../LandingApp/SidebarAdminApp"; // Ajusta la ruta según tu estructura
import background from "/assets/bgLanding.jpg"; // Ruta a tu imagen de fondo

interface ITurno {
  _id: string;
  usuario: {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    celular: string;
  } | null;
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
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string>("");
  const [servicios, setServicios] = useState<string[]>([]);

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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarAdminApp />

      {/* Contenedor Principal */}
      <main className="flex-1 p-8 relative overflow-hidden">
        {/* Fondo desenfocado */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background})`,
            filter: "blur(3px)",
            zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
          }}
        ></div>

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <h2
          className="text-4xl font-bold text-center mb-8 z-10 relative"
          style={{
            fontFamily: "'Playball', cursive",
            fontWeight: "700",
            color: "#cb0c4f",
          }}
        >
          Listado de Clientes por Día
        </h2>

        {/* Filtros */}
        <div className="flex space-x-4 mb-6 justify-center z-10 relative">
          {/* Filtro de fecha */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Fecha:
            </label>
            <input
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              className="border border-gray-300 rounded-lg max-w-24 p-2"
            />
          </div>

          {/* Filtro de servicio */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Servicio:
            </label>
            <select
              value={servicioSeleccionado}
              onChange={(e) => setServicioSeleccionado(e.target.value)}
              className="border border-gray-300 rounded-lg max-w-44 p-2"
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

        {/* Contenedor para los resultados */}
        <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6 z-10 relative">
          {turnosFiltrados.length === 0 ? (
            <p
              className="text-gray-700 text-center"
              style={{
                fontFamily: "'Playball', cursive",
                fontWeight: "400",
                color: "#cb0c4f",
              }}
            >
              No hay turnos para la fecha o servicio seleccionados.
            </p>
          ) : (
            turnosFiltrados.map((turno) => (
              <div
                key={turno._id}
                className="relative bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mb-4"
              >
                <div className="absolute top-4 right-4 flex space-x-2">
                  {turno.usuario?.celular && (
                    <a
                      href={`https://wa.me/${turno.usuario.celular}`}
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
                  )}
                </div>

                <h2 className="text-xl font-semibold text-[#cb0c4f] mb-2">
                  Servicio: {turno.servicio.nombre}
                </h2>
                {turno.usuario ? (
                  <>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Cliente:</span>{" "}
                      {turno.usuario.nombre} {turno.usuario.apellido}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">DNI:</span>{" "}
                      {turno.usuario.dni}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Email:</span>{" "}
                      {turno.usuario.email}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Celular:</span>{" "}
                      {turno.usuario.celular}
                    </p>
                  </>
                ) : (
                  <p className="text-red-500">Cliente no disponible</p>
                )}
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Fecha:</span>{" "}
                  {new Date(turno.fecha).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Hora:</span> {turno.hora}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Descripción:</span>{" "}
                  {turno.servicio.descripcion}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Precio:</span> $
                  {turno.servicio.precio}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Profesional:</span>{" "}
                  {turno.profesional.nombre} {turno.profesional.apellido}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ListadoClientesPorDia;
