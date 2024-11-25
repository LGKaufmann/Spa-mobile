import background from "/assets/bgLanding.jpg"; // Asegúrate de que esta ruta sea correcta

const Empleo = () => {
  return (
    <section
      id="empleo"
      className="py-16 min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Fondo desenfocado */}
      <div
        className="absolute inset-0"
        style={{
          filter: "blur(3px)", // Aplica el desenfoque
          zIndex: 1, // Coloca este div detrás del contenido
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

      {/* Contenido principal */}
      <div className="container mx-auto flex flex-col items-center text-center relative z-20 py-16">
        <h1
          className="text-5xl font-semibold text-[#cb0c4f] mb-6"
          style={{ fontFamily: "Playball, cursive" }} // Aplicar la fuente Playball
        >
          Trabaja con nosotros!
        </h1>

        <p
          className="text-2xl text-[#cb0c4f] mb-8"
          style={{
            fontFamily: "Playball, sans-serif",
          }}
        >
          Estamos siempre en busca de profesionales apasionados por el bienestar
          y la relajación. Únete a nuestro equipo y descubre oportunidades de
          crecimiento.
        </p>

        <h3
          className="text-2xl font-semibold mb-4 text-[#cb0c4f]"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Áreas disponibles:
        </h3>

        {/* Diseño de cuadrícula simétrico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            "Masajista",
            "Esteticista",
            "Recepción y atención al cliente",
            "Marketing y redes sociales",
          ].map((area, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              style={{ fontFamily: "Lato, sans-serif", color: "#cb0c4f" }}
            >
              <h4 className="text-xl font-semibold mb-2">{area}</h4>
              <p className="text-gray-600">
                Descubre cómo puedes contribuir a nuestro equipo en esta área.
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-lg text-[#cb0c4f] mb-6"
          style={{
            fontFamily: "Lato, sans-serif", // Aplicar la fuente Lato
          }}
        >
          Si compartes nuestra pasión por el bienestar, ¡queremos conocerte!
        </p>

        <a
          href="https://wa.me/1234567890"
          className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-[#cb0c4f] transition duration-300"
        >
          Envíanos un mensaje por WhatsApp
        </a>
      </div>
    </section>
  );
};

export default Empleo;
