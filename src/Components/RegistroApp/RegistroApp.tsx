import React, { useState } from "react";
import User from "/assets/user.svg";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/userAction";
import { Link, useNavigate } from "react-router-dom";
import background from "/assets/background.jpg";

interface FormState {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
  DNI: string;
  celular: string;
  userType: string; // Campo para el rol
}

const RegistroApp: React.FC = () => {
  const [formValues, setFormValues] = useState<FormState>({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    DNI: "",
    celular: "",
    userType: "cliente", // Inicializado con cliente
  });

  const [errors, setErrors] = useState<{ [key in keyof FormState]?: string }>(
    {}
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key in keyof FormState]?: string } = {};

    if (formValues.nombre.length < 3 || formValues.nombre.length > 12) {
      newErrors.nombre = "El nombre debe tener entre 3 y 12 caracteres.";
    }
    if (formValues.apellido.length < 3 || formValues.apellido.length > 12) {
      newErrors.apellido = "El apellido debe tener entre 3 y 12 caracteres.";
    }
    if (!/^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formValues.email)) {
      newErrors.email = "El email no es válido.";
    }
    if (formValues.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    if (!/^\d{8,15}$/.test(formValues.DNI)) {
      newErrors.DNI = "El DNI debe tener entre 8 y 15 dígitos.";
    }
    if (!/^\d{10,15}$/.test(formValues.celular)) {
      newErrors.celular = "El número de teléfono debe tener entre 10 y 15 dígitos.";
    }
    if (!formValues.userType) {
      newErrors.userType = "Debe seleccionar un rol.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch<any>(registerUser(formValues)); // Envío del rol incluido
      console.log("Formulario enviado", formValues);
      // Redireccionar según el tipo de usuario
      if (formValues.userType === "cliente") {
        navigate("/app-login"); // Cambiar la ruta de navegación según tu configuración
      } else if (formValues.userType === "profesional") {
        navigate("/loginProfesionalesApp");
      } else if (formValues.userType === "secretaria") {
        navigate("/loginSecretariaApp");
      }
    }
  };

  const inputsStyle =
    "h-10 w-full pl-4 rounded-3xl bg-white text-black shadow-inner shadow-gray-300 font-semibold text-lg placeholder:text-[#cb0c4f] placeholder:font-semibold";

  return (
    <main className="flex flex-col items-center justify-center h-screen mx-auto relative">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${background})`,
          filter: "brightness(0.5)",
        }}

      ></div>
      {/* Botón "Volver al Inicio" en la esquina superior izquierda */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 bg-[#cb0c4f] text-white font-semibold py-2 px-4 rounded shadow hover:bg-pink-600 z-10"
      >
        Volver al Inicio
      </Link>      
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg flex flex-col items-center gap-4 p-6 rounded-3xl border border-[#cb0c4f] bg-white bg-opacity-15 backdrop-blur-lg"
      >
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-3xl font-bold text-[#cb0c4f] text-center">
            Registro en la Aplicación
          </h2>
          <img
            src={User}
            alt="user icon"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>
        <section className="w-full flex flex-col items-center gap-4">
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className={inputsStyle}
            required
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre}</p>
          )}

          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formValues.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            className={inputsStyle}
            required
          />
          {errors.apellido && (
            <p className="text-red-500 text-sm">{errors.apellido}</p>
          )}

          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Correo"
            className={inputsStyle}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className={inputsStyle}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="Repetir Contraseña"
            className={inputsStyle}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          <input
            type="text"
            id="DNI"
            name="DNI"
            value={formValues.DNI}
            onChange={handleChange}
            placeholder="DNI"
            className={inputsStyle}
            required
          />
          {errors.DNI && <p className="text-red-500 text-sm">{errors.DNI}</p>}

          <input
            type="text"
            id="celular"
            name="celular"
            value={formValues.celular}
            onChange={handleChange}
            placeholder="Número de Teléfono"
            className={inputsStyle}
            required
          />
          {errors.celular && (
            <p className="text-red-500 text-sm">{errors.celular}</p>
          )}

          {/* Select para elegir rol */}
          <select
            name="userType"
            value={formValues.userType}
            onChange={handleChange}
            className={inputsStyle}
            required
          >
            <option value="cliente">Cliente</option>
            <option value="profesional">Profesional</option>
            <option value="secretaria">Secretaria</option>
          </select>
          {errors.userType && (
            <p className="text-red-500 text-sm">{errors.userType}</p>
          )}

          <button
            type="submit"
            className="w-full h-10 bg-[#cb0c4f] rounded-3xl text-base text-white font-semibold transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Registrarse
          </button>
        </section>
      </form>
    </main>
  );
};

export default RegistroApp;
