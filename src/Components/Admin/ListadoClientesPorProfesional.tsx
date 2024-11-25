import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import SidebarAdminApp from "../LandingApp/SidebarAdminApp"; // Ajusta la ruta según tu estructura
import background from "/assets/bgLanding.jpg"; // Ruta a tu imagen de fondo

interface ICliente {
  _id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  celular: string;
  turnos: string[]; // Assuming clients have an array of appointment IDs
}

interface IProfesional {
  _id: string;
  nombre: string;
  apellido: string;
}

interface IServicio {
  nombre: string;
  descripcion: string;
  precio: number;
}

interface ITurno {
  _id: string;
  usuario: {
    _id: string;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    celular: string;
  };
  profesional: {
    _id: string;
    nombre: string;
    apellido: string;
  };
  servicio: IServicio; // Include service details
  fecha: string; // Date of the appointment
  hora: string; // Time of the appointment
}

const ListadoClientesPorProfesional: React.FC = () => {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [profesionales, setProfesionales] = useState<IProfesional[]>([]);
  const [turnos, setTurnos] = useState<ITurno[]>([]);
  const [selectedProfesional, setSelectedProfesional] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const response = await axios.get("/usuarios/profesionales");
        setProfesionales(response.data);
      } catch (error) {
        setError("Hubo un error al cargar los profesionales.");
      }
    };

    fetchProfesionales();
  }, []);

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/usuarios");
        setClientes(response.data);
      } catch (error) {
        setError("Hubo un error al cargar los clientes.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTurnos = async () => {
      try {
        const response = await axios.get("servicios/turnos"); // API endpoint to get appointments
        setTurnos(response.data);
      } catch (error) {
        setError("Hubo un error al cargar los turnos.");
      }
    };

    fetchClientes();
    fetchTurnos();
  }, []);

  const handleProfesionalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfesional(e.target.value);
  };

  const filteredClientes = selectedProfesional
    ? clientes.filter((cliente) =>
        turnos.some(
          (turno) =>
            turno.usuario && // Check if usuario exists
            turno.usuario._id === cliente._id &&
            turno.profesional && // Check if profesional exists
            turno.profesional._id === selectedProfesional
        )
      )
    : clientes;

  if (loading) {
    return <p className="text-center text-gray-600">Cargando clientes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="flex min-h-screen">
      <SidebarAdminApp />

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

        <h2 className="text-4xl font-bold text-center mb-8 z-10 relative" style={{ fontFamily: "'Playball', cursive", color: "#cb0c4f" }}>
          Listado de Clientes por Profesional
        </h2>

        <div className="mb-6 z-10 relative">
          <label htmlFor="profesional" className="block text-lg font-medium text-white mb-2">
            Selecciona un Profesional:
          </label>
          <select
            id="profesional"
            value={selectedProfesional}
            onChange={handleProfesionalChange}
            className="form-select w-full p-2 border bg-white text-black border-gray-300 rounded-lg"
          >
            <option value="" disabled>
              Selecciona un profesional
            </option>
            {profesionales.map((profesional) => (
              <option key={profesional._id} value={profesional._id}>
                {profesional.nombre} {profesional.apellido}
              </option>
            ))}
          </select>
        </div>

        {filteredClientes.length === 0 ? (
          <p className="text-center text-gray-600 z-10 relative">
            No hay clientes registrados para este profesional.
          </p>
        ) : (
          <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6 z-10 relative">
            <table className="min-w-full text-black border border-gray-200 shadow-sm rounded-lg">
              <thead className="bg-[#cb0c4f] text-white">
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Nombre</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Apellido</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">DNI</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Email</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Celular</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Servicio</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Fecha</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Hora</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                {filteredClientes.map((cliente, index) => {
                  const clienteTurnos = turnos.filter(
                    (turno) =>
                      turno.usuario && // Check if usuario exists
                      turno.usuario._id === cliente._id &&
                      turno.profesional && // Check if profesional exists
                      turno.profesional._id === selectedProfesional
                  );

                  return clienteTurnos.map((turno, turnoIndex) => (
                    <tr
                      key={`${cliente._id}-${turnoIndex}`}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      } hover:bg-[#cb0c4f] hover:bg-opacity-10 transition-colors`}
                    >
                      <td className="px-6 py-4 border-b border-gray-200">{cliente.nombre}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{cliente.apellido}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{cliente.dni}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{cliente.email}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{cliente.celular}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{turno.servicio.nombre}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{turno.fecha}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{turno.hora}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListadoClientesPorProfesional;
