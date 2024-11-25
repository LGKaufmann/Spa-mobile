import background from "/assets/bgLanding.jpg"; // Asegúrate de que esta ruta sea correcta

const Noticias = () => {
  return (
    <section
      id="noticias"
      className="py-16 min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Fondo desenfocado */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          filter: "blur(3px)", // Aplica el desenfoque
          zIndex: 1, // Coloca este div detrás del contenido
        }}
      ></div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

      {/* Contenido principal */}
      <div className="container mx-auto text-center relative z-20">
        <h2
          className="text-5xl font-bold mb-6 text-[#cb0c4f]"
          style={{ fontFamily: "Playball, cursive" }} // Aplicar la fuente Playball
        >
          Últimas Noticias
        </h2>

        <p
          className="text-2xl text-[#cb0c4f] mb-8"
          style={{ fontFamily: "Playball, cursive" }}
        >
          Mantente informado sobre nuestras últimas ofertas, eventos especiales
          y noticias importantes.
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="lg:w-1/4 bg-white bg-opacity-30 border-2 border-[#cb0c4f] backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              style={{ fontFamily: "Lato, sans-serif", color: "#cb0c4f" }}
            >
              <img
                src="/assets/N3.jpg"
                alt={`Noticia ${index + 1}`}
                className="w-full h-48 object-cover mb-4 rounded-t-lg"
              />
              <h3 className="text-2xl font-semibold mb-2 text-[#cb0c4f]">
                Noticia Destacada {index + 1}
              </h3>
              <p className="text-gray-700 mb-4">
                Resumen breve de la noticia destacada que captura la esencia del
                contenido y llama a la acción.
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Leer más
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Noticias;
