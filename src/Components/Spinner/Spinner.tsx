import React from "react";

export const Spinner: React.FC<{ size?: number; color?: string }> = ({
  size = 24, // Tamaño por defecto más grande
  color = "#4CAF50", // Color verde por defecto
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="border-4 border-solid rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent transparent transparent`, // Color verde para el borde
          animationDuration: "0.8s", // Duración de la animación
          borderWidth: "4px", // Grosor del borde
        }}
      ></div>
      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
};
