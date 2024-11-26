import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import background from "/assets/background.jpg";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

interface FormData {
  nombre: string;
  email: string;
  metodoPago: string;
  cantidad: string;
  servicio: string;
  numeroTarjeta?: string;
  fechaVencimiento?: string;
  codigoSeguridad?: string;
}

const RegistrarPagoApp: React.FC = () => {
  const location = useLocation();
  const { precio, servicio: servicioLocation } = location.state || {};
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.users);
  const [formData, setFormData] = useState<FormData>({
    nombre: `${user.nombre} ${user.apellido}`,
    email: user.email || "",
    metodoPago: "tarjetaDebito",
    cantidad: precio || "",
    servicio: servicioLocation?.nombre || "",
    numeroTarjeta: "",
    fechaVencimiento: "",
    codigoSeguridad: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (precio) {
      setFormData((prev) => ({
        ...prev,
        cantidad: precio,
      }));
    }
    if (servicioLocation) {
      setFormData((prev) => ({
        ...prev,
        servicio: servicioLocation.nombre,
      }));
    }
  }, [precio, servicioLocation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Validación para solo números en el campo de número de tarjeta
    if (name === "numeroTarjeta") {
      const valor = value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
      setFormData({
        ...formData,
        [name]: valor,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validarFormulario = (): string => {
    const {
      nombre,
      email,
      cantidad,
      servicio,
      numeroTarjeta,
      fechaVencimiento,
      codigoSeguridad,
    } = formData;
    if (
      !nombre ||
      !email ||
      !cantidad ||
      !servicio ||
      (formData.metodoPago !== "efectivo" &&
        (!numeroTarjeta || !fechaVencimiento || !codigoSeguridad))
    ) {
      return "Todos los campos son obligatorios";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "El correo electrónico no es válido";
    }
    if (parseFloat(cantidad) <= 0) {
      return "La cantidad debe ser mayor a 0";
    }
    if (numeroTarjeta && numeroTarjeta.length !== 16) {
      return "El número de tarjeta debe tener 16 dígitos";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validarFormulario();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const cantidadConDescuento = (
        parseFloat(formData.cantidad) * 0.9
      ).toFixed(2);

      const response = await fetch("http://localhost:3001/servicios/pagos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cantidad: cantidadConDescuento,
        }),
      });

      const data = await response.json();
      console.log("Pago registrado con éxito:", data);

      Swal.fire({
        icon: "success",
        title: "Pago registrado con éxito",
        text: `Se aplicó un descuento del 10%!. Total pagado: ${cantidadConDescuento}`,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/home-app");
      });

      setFormData({
        nombre: `${user.nombre} ${user.apellido}`,
        email: user.email || "",
        metodoPago: "tarjetaDebito",
        cantidad: precio || "",
        servicio: servicioLocation?.nombre || "",
        numeroTarjeta: "",
        fechaVencimiento: "",
        codigoSeguridad: "",
      });
      setError("");
    } catch (error) {
      console.error("Hubo un problema al registrar el pago:", error);
      setError("Hubo un problema al registrar el pago.");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen mx-auto relative">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${background})`,
          filter: "brightness(0.5)",
        }}
      ></div>

      <button
        onClick={() => navigate("/aplicacion-web")}
        className="absolute top-4 left-4 bg-[#cb0c4f] text-white rounded-full px-4 py-2 text-base font-semibold hover:scale-105 transition-transform"
      >
        Volver Atrás
      </button>

      <div className="relative w-full max-w-lg p-8 bg-white bg-opacity-15 rounded-3xl backdrop-blur-lg border border-[#cb0c4f] shadow-lg">
        <h2
          className="text-3xl font-semibold text-center text-[#cb0c4f] mb-4"
          style={{ fontFamily: "Playball, sans-serif" }}
        >
          Registrar Pago
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#cb0c4f] transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#cb0c4f] transition"
            required
          />
          <select
            name="metodoPago"
            value={formData.metodoPago}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#cb0c4f] transition"
          >
            <option value="tarjetaDebito">Tarjeta de Débito</option>
            <option value="tarjetaCredito">Tarjeta de Crédito</option>
            <option value="efectivo">Efectivo</option>
          </select>
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#cb0c4f] transition"
            required
          />
          <input
            type="text"
            name="servicio"
            placeholder="Servicio"
            value={formData.servicio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#cb0c4f] transition"
            required
          />
          {formData.metodoPago !== "efectivo" && (
            <>
              <input
                type="text"
                name="numeroTarjeta"
                placeholder="Número de Tarjeta"
                value={formData.numeroTarjeta}
                onChange={handleChange}
                maxLength={16}
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#cb0c4f] transition"
              />
              <input
                type="text"
                name="fechaVencimiento"
                placeholder="Fecha de Vencimiento (MM/AA)"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#cb0c4f] transition"
              />
              <input
                type="text"
                name="codigoSeguridad"
                placeholder="Código de Seguridad"
                value={formData.codigoSeguridad}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#cb0c4f] transition"
              />
            </>
          )}
          {error && (
            <div className="text-red-600 text-center text-sm mt-2">{error}</div>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-[#cb0c4f] text-white rounded-md text-lg hover:scale-105 transition-transform"
          >
            Registrar Pago
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegistrarPagoApp;
