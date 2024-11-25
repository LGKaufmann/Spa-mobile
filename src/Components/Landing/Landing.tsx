import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesAction } from "../../redux/servicesAction";
import CardLanding from "./CardLanding";
import background from "/assets/bgLanding.jpg";

export const Landing = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state: any) => state.services);
  const { user } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch<any>(getServicesAction());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center relative overflow-hidden">
      {/* Fondo desenfocado */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          filter: "blur(3px)", // Aplica el desenfoque
          zIndex: 1, // Coloca este div detrás del contenido
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

      {/* Contenido principal */}
      <header className="text-center mb-12 z-20 relative">
        <h1
          className="text-6xl font-bold mb-4 drop-shadow-lg"
          style={{
            fontFamily: "'Playball', cursive",
            fontWeight: "700",
            color: "#cb0c4f",
          }}
        >
          Bienvenido a Nuestro Spa
        </h1>
        <p
          className="text-2xl font-light"
          style={{
            fontFamily: "'Playball', cursive",
            fontWeight: "600",
            color: "#cb0c4f",
          }}
        >
          Descubre nuestros exclusivos servicios de relajación y bienestar
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full z-20 relative">
        {services.length > 0 ? (
          services.map((serv) => (
            <CardLanding
              id={serv._id}
              key={serv._id}
              nombre={serv.nombre}
              descripcion={serv.descripcion}
              precio={serv.precio}
            />
          ))
        ) : (
          <p
            className="text-white"
            style={{
              fontFamily: "'Playball', cursive",
              fontWeight: "400",
              color: "#cb0c4f",
            }}
          >
            No hay servicios disponibles en este momento.
          </p>
        )}
      </div>
    </div>
  );
};
