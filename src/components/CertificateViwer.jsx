import "../styles/components/_certificateView.scss";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as Close_SVG } from "../icons/close.svg";
import { ReactComponent as Download_SVG } from "../icons/download.svg";
import { ReactComponent as Web_SVG } from "../icons/external-page.svg";

export default function CertificateViwer({ Data }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const openButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloquea scroll del fondo
      dialogRef.current?.focus(); // Enfoca el diálogo
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = ""; // Restaura scroll
      openButtonRef.current?.focus(); // Devuelve el foco al botón
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="certificate-view">
      <button
        ref={openButtonRef}
        className="button-text-icon-border-accent certificate-view--open-button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="certificate-dialog"
        aria-label={`Ver certificado de ${Data.Title}`}
      >
        Ver certificado
      </button>

      {isOpen && (
        <dialog
          id="certificate-dialog"
          open
          className="certificate-view--dialog"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          tabIndex={-1}
        >
          <div className="certificate-view--dialog--content">
            <div className="certificate-view--dialog--head">
              <div>
                <strong id="dialog-title" className="text-primary">
                  {Data.Title}
                </strong>
                <br />
                <strong>{Data.Academy}</strong>
              </div>
              <div>
                <button
                  className="button-icon-background-accent"
                  onClick={() => setIsOpen(false)}
                  title="Cerrar ventana emergente"
                  aria-label="Cerrar ventana emergente"
                >
                  <Close_SVG />
                </button>
              </div>
            </div>

            <div
              id="dialog-description"
              className="certificate-view--dialog--body"
            >
              <img
                src={Data.Image.src}
                alt={`Certificado de ${Data.Title}`}
                loading="lazy"
                decoding="async"
              />
              <p>
                <strong>Fecha: </strong>&nbsp;
                {Data.Year.toLocaleDateString("es-CO", {
                  timeZone: "America/Bogota",
                  year: "numeric",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>

            <div className="certificate-view--dialog--footer">
              <a
                className="button-text-icon-border-secondary"
                download
                href={Data.PDF_link}
              >
                Descargar PDF <Download_SVG />
              </a>
              {Data.WEB_link && (
                <a
                  href={Data.WEB_link}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="button-text-icon-border-accent"
                >
                  Versi&oacute;n web <Web_SVG />
                </a>
              )}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
