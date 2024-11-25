import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "/assets/user.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, loginUser } from "../../redux/userAction";
import { Spinner } from "../Spinner/Spinner";
import appBackground from "/assets/background.jpg"; // Cambia el fondo para diferenciar el login de la app

interface LoginState {
  email: string;
  password: string;
}

const AppLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state: any) => state.users);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<LoginState>({ email: "", password: "" });

  useEffect(() => {
    if (token) {
      navigate("/home-app"); // Redirige a la página de inicio de la app
      dispatch<any>(fetchUserData(token));
    }
  }, [token, navigate]);

  const inputsStyle =
    "h-12 w-full pl-6 rounded-3xl bg-white text-black shadow-inner shadow-gray-300 font-semibold text-lg placeholder:text-[#cb0c4f] placeholder:font-semibold";

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch<any>(loginUser(user));
    resetForm();
  };

  useEffect(() => {
    setUser({ email, password });
  }, [email, password]);

  return (
    <main className="flex items-center justify-center h-screen mx-auto relative font-[Playwrite DE Grund]">
    
      {/* Fondo personalizado */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${appBackground})`, // Fondo específico para el login de la app
          filter: "brightness(0.5)",
        }}
      ></div>

      {/* Botón para volver atrás en la esquina superior izquierda */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-[#cb0c4f] text-white rounded-full px-4 py-2 text-base font-semibold hover:scale-105 transition-transform"
      >
        Volver Atrás
      </button>
      
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg flex flex-col items-center gap-6 p-6 rounded-3xl border border-[#cb0c4f] bg-white bg-opacity-15 backdrop-blur-lg"
      >
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-4xl font-bold text-[#cb0c4f] text-center">
            Iniciar sesión en la App
          </h2>
          <img
            src={User}
            alt="user icon"
            className="w-32 h-32 md:w-64 md:h-64"
          />
        </div>
        <section className="w-full flex flex-col items-center gap-4">
          <input
            type="text"
            value={email}
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            className={inputsStyle}
          />
          <input
            type="password"
            value={password}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className={inputsStyle}
          />
          <button
            className="w-full h-12 bg-[#cb0c4f] rounded-3xl text-base text-white font-semibold transition-transform transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
            type="submit"
          >
            {loading ? <Spinner size={24} color="#4CAF50" /> : "Iniciar Sesión"}
          </button>
          <Link to="/RegistroApp" className="w-full">
            <button className="w-full h-12 bg-[#cb0c4f] rounded-3xl text-base text-white font-semibold transition-transform transform hover:scale-105 hover:shadow-lg">
              Crear cuenta en la App
            </button>
          </Link>
        </section>
      </form>
    </main>
  );
};

export default AppLogin;
