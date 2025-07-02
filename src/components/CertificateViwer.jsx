import "../styles/components/_certificateView.scss";
import { useState } from "react";

export default function CertificateViwer({ Data }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="certificate-view">
      <button
        className="button-text-background-accent certificate-view--open-button"
        onClick={() => setIsOpen(true)}
      >
        Ver certificado
      </button>
      <dialog open={isOpen} className="certificate-view--dialog">
        <div className="certificate-view--dialog--head">
          <div>
            <h4 className="text-primary">{Data.Title}</h4>
            <strong>{Data.Academy}</strong>
          </div>
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        <div className="certificate-view--dialog--body">
          <span>
            {Data.Year.toLocaleDateString("es-CO", {
              timeZone: "America/Bogota",
              year: "numeric",
              day: "numeric",
              month: "long",
            })}
          </span>{" "}
          <br />
          <img
            src={Data.Image.src}
            alt={`${Data.Title} - ${Data.Academy}`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="certificate-view--dialog--footer">
          <a className="button-text-accent" download href={Data.PDF_link}>
            Descargar PDF
          </a>
          {Data.WEB_link && (
            <a href={Data.WEB_link} rel="noreferrer noopener" target="_blank">
              Versi&oacute;n web
            </a>
          )}
        </div>
      </dialog>
    </div>
  );
}
