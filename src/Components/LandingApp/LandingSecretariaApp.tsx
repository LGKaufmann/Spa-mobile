import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import background from "/assets/background.jpg";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userAction"; // Importa la acción de logout
import SidebarAdminApp from "./SidebarAdminApp"; // Importa la Sidebar

interface Payment {
  _id: string;
  nombre: string;
  email: string;
  cantidad: number;
  servicio: string;
  fechaPago: string;
}

const LandingSecretariaApp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

  const { user } = useSelector((state: any) => state.users);

  const formatFechaPago = (fecha: string) => {
    const partes = fecha.split("T");
    return partes.length > 1 ? partes[0].trim() : fecha;
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/servicios/pagos");
        setPayments(response.data);
      } catch (err) {
        setError("Error al obtener los pagos");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser()); // Despacha la acción de logout
    localStorage.removeItem("token"); // Elimina el token de almacenamiento local
    setLogoutMessage("Sesión cerrada correctamente."); // Establece el mensaje de sesión cerrada
    setTimeout(() => {
      navigate("/"); // Redirige a la página de inicio después de cerrar sesión
    }, 2000); // Espera 2 segundos antes de redirigir
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          filter: "brightness(0.5)", // Reduce el brillo para que el contenido sea visible
          zIndex: -1, // Esto asegura que el fondo esté detrás de todo el contenido
        }}
      ></div>

      {/* Sidebar */}
      <SidebarAdminApp />

      {/* Contenedor principal */}
      <main className="flex-1 flex flex-col items-center justify-start pt-20 pb-44 lg:py-12 relative z-10">
        {/* Mensaje de logout */}
        {logoutMessage && (
          <div className="absolute top-5 right-5 bg-green-500 text-white font-semibold py-2 px-4 rounded shadow z-20">
            {logoutMessage}
          </div>
        )}

        {/* Título */}
        {user && (
          <div className="w-full max-w-6xl bg-transparent px-4 lg:px-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#cb0c4f] mb-6 text-center lg:text-left">
              Pagos Realizados
            </h2>
          </div>
        )}

        {/* Contenido principal */}
        {loading ? (
          <p className="text-white">Cargando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-white w-full max-w-6xl h-full rounded-lg shadow-lg overflow-hidden">
            {/* Tabla */}
            <div className="overflow-x-auto max-h-screen">
              <table className="min-w-full border border-gray-200 bg-white">
                <thead>
                  <tr className="bg-[#cb0c4f] text-white">
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Nombre y Apellido</th>
                    <th className="py-3 px-4 text-left">Servicio</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Monto</th>
                    <th className="py-3 px-4 text-left">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment: Payment) => (
                      <tr
                        key={payment._id}
                        className="hover:bg-gray-100 transition-colors duration-200"
                      >
                        <td className="py-2 px-4 border-b text-black">
                          {payment._id}
                        </td>
                        <td className="py-2 px-4 border-b text-black">
                          {payment.nombre}
                        </td>
                        <td className="py-2 px-4 border-b text-black">
                          {payment.servicio}
                        </td>
                        <td className="py-2 px-4 border-b text-black">
                          {payment.email}
                        </td>
                        <td className="py-2 px-4 border-b text-black">
                          {payment.cantidad}
                        </td>
                        <td className="py-2 px-4 border-b text-black">
                          {formatFechaPago(payment.fechaPago)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-2 px-4 text-center text-black"
                      >
                        No hay pagos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingSecretariaApp;
