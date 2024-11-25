import Banner from "/assets/banner.jpg";

const HomeHeadMobile = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Imagen de fondo adaptada para mobile */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="w-full h-full bg-black opacity-45" />{" "}
        {/* Opacidad ajustada aquí */}
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 p-10 rounded-lg mx-auto h-fit w-3/4 md:w-1/2 text-center">
        <div
          className="mb-2"
          style={{
            fontFamily: "'Playball', cursive", // Fuente Playball
            fontWeight: "700", // Peso de la fuente
            fontSize: "3.5rem", // Tamaño de fuente ajustado para mayor legibilidad
            color: "#cb0c4f",
            // textShadow: "0 0 10px rgba(255, 255, 255, 0.3)", // Brillo eliminado
          }}
        >
          SPA SENTIRSE BIEN
        </div>

        {/* Descripción con tamaño de texto ajustado */}
        <div
          className="mb-4"
          style={{
            fontFamily: "'Playball', cursive", // Fuente Playball
            fontWeight: "400", // Peso de la fuente
            fontSize: "1.8rem", // Tamaño de fuente ajustado para mayor legibilidad
            color: "#cb0c4f",
            // textShadow: "0 0 10px rgba(255, 255, 255, 0.5)", // Brillo eliminado
          }}
        >
          Tu lugar de paz y rejuvenecimiento
        </div>
      </div>
    </div>
  );
};

export default HomeHeadMobile;
