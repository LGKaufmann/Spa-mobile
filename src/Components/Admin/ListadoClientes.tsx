import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdminApp from "../LandingApp/SidebarAdminApp"; // Ajusta la ruta según tu estructura
import background from "/assets/bgLanding.jpg"; // Ruta a tu imagen de fondo

interface ICliente {
  _id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  celular: string;
}

const ListadoClientes: React.FC = () => {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("/usuarios");
        setClientes(response.data);
        setLoading(false);
      } catch (error) {
        setError("Hubo un error al cargar los clientes.");
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando clientes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="flex min-h-screen">
      <SidebarAdminApp /> {/* Sidebar agregado aquí */}
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
          Listado de Clientes
        </h2>

        {/* Contenedor para los resultados */}
        <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6 z-10 relative">
          {clientes.length === 0 ? (
            <p
              className="text-gray-700 text-center"
              style={{
                fontFamily: "'Playball', cursive",
                fontWeight: "400",
                color: "#cb0c4f",
              }}
            >
              No hay clientes registrados.
            </p>
          ) : (
            <table className="min-w-full bg-white text-black border border-gray-200 shadow-sm rounded-lg">
              <thead className="bg-[#cb0c4f] text-white">
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Nombre</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Apellido</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">DNI</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Email</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200">Celular</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                {clientes.map((cliente, index) => (
                  <tr
                    key={cliente._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-[#cb0c4f] hover:bg-opacity-10 transition-colors`}
                  >
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                      {cliente.nombre}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                      {cliente.apellido}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                      {cliente.dni}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                      {cliente.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                      {cliente.celular}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListadoClientes;
