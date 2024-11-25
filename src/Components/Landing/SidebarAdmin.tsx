import React from "react";

const SidebarAdmin: React.FC = () => {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-green-700 to-[#cb0c4f] text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Panel de Administración</h2>
      <ul className="space-y-4">
        <li>
          <a
            href="/listadoClientes"
            className="hover:bg-blue-300 hover:text-white text-white p-2 block rounded transition duration-300 ease-in-out"
          >
            Listado de clientes
          </a>
        </li>
        <li>
          <a
            href="/listadoClientesDia"
            className="hover:bg-blue-300 hover:text-white text-white p-2 block rounded transition duration-300 ease-in-out"
          >
            Listado de clientes a atender por día
          </a>
        </li>
        <li>
          <a
            href="/listadoClientesProfesional"
            className="hover:bg-blue-300 hover:text-white text-white p-2 block rounded transition duration-300 ease-in-out"
          >
            Listado de clientes por profesional
          </a>
        </li>
        <li>
          <a
            href="/home"
            className="hover:bg-blue-300 hover:text-white text-white p-2 block rounded transition duration-300 ease-in-out"
          >
            Servicios
          </a>
        </li>
        <li>
          <a
            href="/informeServicios"
            className="hover:bg-blue-300 hover:text-white text-white p-2 block rounded transition duration-300 ease-in-out"
          >
            Informe de servicios por profesional
          </a>
        </li>
        <li>
          <a
            href="/informeIngresos"
            className="hover:bg-blue-300 hover:text-white text-white p-2 block rounded transition duration-300 ease-in-out"
          >
            Informe de ingresos
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
