// ServicesListApp.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesAction } from "../../redux/servicesAction";
import background from "/assets/bgLanding.jpg"; // Ruta a tu imagen de fondo
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userAction"; // Importa la acción de logout
import SidebarAdminApp from "./SidebarAdminApp";

const ServicesListApp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services } = useSelector((state: any) => state.services);
  const { user } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch<any>(getServicesAction());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Despacha la acción de logout
    localStorage.removeItem("token"); // Elimina el token de almacenamiento local
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarAdminApp /> {/* Agrega la SidebarAdminApp aquí */}

      <div className="flex-1 relative">
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

        <main className="p-8 relative z-10">
        
          {/* Encabezado */}
          <h2 className="text-4xl font-bold text-center mb-8" style={{ fontFamily: "'Playball', cursive", color: "#cb0c4f" }}>
            Bienvenido a Nuestra App Sentirse Bien
          </h2>

          <p className="text-xl font-light text-center mb-4" style={{ fontFamily: "'Playball', cursive", color: "#cb0c4f" }}>
            Descubre nuestros exclusivos servicios de relajación y bienestar
          </p>

          {/* Lista de servicios */}
          <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6">
            {services.length > 0 ? (
              <table className="min-w-full text-black border border-gray-200 shadow-sm rounded-lg">
                <thead className="bg-[#cb0c4f] text-white">
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-200">Nombre</th>
                    <th className="px-6 py-3 border-b-2 border-gray-200">Descripción</th>
                    <th className="px-6 py-3 border-b-2 border-gray-200">Precio</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50">
                  {services.map((serv, index) => (
                    <tr key={serv._id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-[#cb0c4f] hover:bg-opacity-10 transition-colors`}>
                      <td className="px-6 py-4 border-b border-gray-200">{serv.nombre}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{serv.descripcion}</td>
                      <td className="px-6 py-4 border-b border-gray-200">${serv.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-600" style={{ fontFamily: "'Playball', cursive", color: "#cb0c4f" }}>
                No hay servicios disponibles en este momento.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServicesListApp;
