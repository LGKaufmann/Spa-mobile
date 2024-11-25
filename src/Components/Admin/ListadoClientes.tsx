import React, { useEffect, useState } from "react";
import axios from "axios";

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
  console.log(clientes);

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
    <div className="bg-gradient-to-b from-green-700 to-[#cb0c4f] min-h-screen flex flex-col  rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Listado de Clientes
      </h2>
      {clientes.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay clientes registrados.
        </p>
      ) : (
        <table className="min-w-full bg-inherit text-black border border-gray-200 shadow-sm rounded-lg">
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
                  {cliente.DNI}
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
  );
};

export default ListadoClientes;
