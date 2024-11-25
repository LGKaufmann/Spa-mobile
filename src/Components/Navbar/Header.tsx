import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";

const Header = () => {
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
  useEffect(() => {
    const manejarCambiosDeAncho = () => {
      setAnchoPantalla(window.innerWidth);
    };
    window.addEventListener("resize", manejarCambiosDeAncho);
    return () => {
      window.removeEventListener("resize", manejarCambiosDeAncho);
    };
  }, []);

  return (
    <header>{anchoPantalla > 1024 ? <Navbar /> : <NavbarMobile />}</header>
  );
};

export default Header;
