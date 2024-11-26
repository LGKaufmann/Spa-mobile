import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userAction";
import { FaBars, FaTimes } from "react-icons/fa";

const SidebarAdminApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.users);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Botón flotante para abrir/cerrar */}
      <button
        onClick={toggleSidebar}
        className="p-3 bg-green-700 text-white fixed top-4 left-4 rounded-full shadow-lg z-50 focus:outline-none lg:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#cb0c4f] text-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Panel de Administración
          </h2>
          <ul className="space-y-4">
            <li>
              <Link
                to={
                  user?.email === "admin@gmail.com"
                    ? "/adminApp"
                    : user?.userType === "profesional"
                    ? "/homeProfesional"
                    : user?.userType === "secretaria"
                    ? "/homeSecretaria"
                    : "/home"
                }
                className="hover:bg-green-700 hover:text-white text-white p-3 block rounded-lg transition duration-300 ease-in-out text-center"
              >
                Inicio
              </Link>
            </li>
            {user?.userType === "secretaria" && (
              <>
                <li>
                  <Link
                    to="/homeSecretaria"
                    className="hover:bg-green-700 hover:text-white text-white p-3 block rounded-lg transition duration-300 ease-in-out text-center"
                  >
                    Pagos Realizados
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/listadoClientes"
                className="hover:bg-green-700 hover:text-white text-white p-3 block rounded-lg transition duration-300 ease-in-out text-center"
              >
                Listado de clientes
              </Link>
            </li>
            <li>
              <Link
                to="/listadoClientesDia"
                className="hover:bg-green-700 hover:text-white text-white p-3 block rounded-lg transition duration-300 ease-in-out text-center"
              >
                Listado de clientes a atender por día
              </Link>
            </li>
            {user?.userType === "admin" && (
              <>
                <li>
                  <Link
                    to="/listadoClientesProfesional"
                    className="hover:bg-green-700 hover:text-white text-white p-3 block rounded-lg transition duration-300 ease-in-out text-center"
                  >
                    Listado de clientes por profesional
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ServiciosApp"
                    className="hover:bg-green-700 hover:text-white text-white p-3 block rounded-lg transition duration-300 ease-in-out text-center"
                  >
                    Servicios
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/informeServicios"
                className="hover:bg-green-700 hover:text-white text-white p-3 block rounded-lg transition duration-300 ease-in-out text-center"
              >
                Informe de servicios por profesional
              </Link>
            </li>
            <li>
              <Link
                to="/informeIngresos"
                className="hover:bg-green-700 hover:text-white text-white p-3 block rounded-lg transition duration-300 ease-in-out text-center"
              >
                Informe de ingresos
              </Link>
            </li>
          </ul>

          {/* Botón de cerrar sesión */}
          <div className="mt-auto flex justify-center mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-pink-700 transition duration-300 ease-in-out mt-4"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div
        className={`flex-1 lg:ml-64 transition-all duration-300 ${
          isOpen ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Aquí iría el contenido principal */}
      </div>
    </div>
  );
};

export default SidebarAdminApp;
