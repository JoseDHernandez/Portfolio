import "../styles/components/_header.scss";
import { useState, useEffect } from "react";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [breakSize, setBreakSize] = useState(false);
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setBreakSize(true);
        setIsOpen(false);
      } else {
        setBreakSize(false);
      }
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return (
    <header className="bg-primary">
      <div className={`navbar${isOpen ? "-open" : ""} limit-section`}>
        <div className="navbar-top">
          <h1 className="text-white navbar-title" role="presentation">
            Jos&eacute;<span className="text-secondary">D</span>Hern&aacute;ndez
          </h1>
          <button
            aria-controls="menu"
            aria-haspopup="true"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className={
              breakSize
                ? "hidden"
                : isOpen
                ? "button-icon-background-primary"
                : "button-icon-primary"
            }
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <nav
          className={`navbar-nav ${
            breakSize && !isOpen ? "" : !breakSize && isOpen ? "" : "hidden"
          }`}
          id="menu"
        >
          <ul role="menu">
            <li role="presentation">
              <a role="menuitem" href="/">
                Inicio
              </a>
            </li>
            <li role="presentation">
              <a role="menuitem" href="/proyectos">
                Proyectos
              </a>
            </li>
            <li role="presentation">
              <a role="menuitem" href="/certificados">
                Certificados
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
