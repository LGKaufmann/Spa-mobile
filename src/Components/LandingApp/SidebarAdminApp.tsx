import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userAction";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const SidebarAdminApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/");
  };
  const { user } = useSelector((state:any) => state.users);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex relative min-h-screen">
      {/* Sidebar */}
      <div className={`flex flex-col ${isOpen ? "w-64" : "w-16"} bg-[#cb0c4f] text-white transition-all duration-300 ease-in-out shadow-lg`}>
        
        {/* Botón de despliegue/plegado */}
        <button
          onClick={toggleSidebar}
          className="p-2 m-2 bg-green-700 text-white rounded-full shadow-lg focus:outline-none"
          style={{ position: "fixed", top: "1rem", left: isOpen ? "16rem" : "4rem", zIndex: 50 }}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Contenido de la Sidebar */}
        <div className={`p-6 ${isOpen ? "visible" : "invisible"} transition-opacity duration-300 ease-in-out`}>
          <h2 className="text-2xl font-bold mb-8 text-center">Panel de Administración</h2>
          <ul className="space-y-4">
          { user?.userType === "secretaria" &&  
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
            }
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
            { user?.userType === "admin" &&   
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
            }
           
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

          {/* Botón de cerrar sesión alineado y estilizado */}
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
    </div>
  );
};

export default SidebarAdminApp;
