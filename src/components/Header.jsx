import "../styles/components/_header.scss";
import { useState } from "react";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary">
      <div className={`navbar-${isOpen ? "open" : "close"} limit-section`}>
        <div className="navbar-top">
          <img src="/favicon.svg" alt="Logo" width="64" height="64" />
          <button
            aria-controls="menu"
            aria-haspopup="true"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className={
              isOpen ? "button-icon-background-primary" : "button-icon-primary"
            }
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <nav className="navbar-nav" id="menu">
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
