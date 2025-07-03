import { URL_PROFILE } from "astro:env/server";
import { ReactComponent as CC_SVG } from "../icons/creative-commons/cc.svg";
import { ReactComponent as BY_SVG } from "../icons/creative-commons/by.svg";
import { ReactComponent as NC_SVG } from "../icons/creative-commons/nc.svg";
import { ReactComponent as ND_SVG } from "../icons/creative-commons/nd.svg";
import { ReactComponent as SA_SVG } from "../icons/creative-commons/sa.svg";
const profileURL = URL_PROFILE ?? "#";
const creative_svg = {
  CC: {
    svg: CC_SVG,
    label: "",
  },
  BY: {
    svg: BY_SVG,
    label: "Atribución: debes dar crédito al autor.",
  },
  NC: {
    svg: NC_SVG,
    label: "No Comercial: no puedes usarlo con fines comerciales.",
  },
  ND: {
    svg: ND_SVG,
    label: "Sin Derivadas: no puedes hacer obras derivadas.",
  },
  SA: {
    svg: SA_SVG,
    label:
      "Compartir Igual: las obras derivadas deben tener la misma licencia.",
  },
};
export default function GetLicense({ License, Work_link, Title, Year }) {
  const repoURL = Work_link ?? "#";
  if (License?.startsWith("CC")) {
    const CC = License.split("-");
    const licenseCode = License.slice(3).toLowerCase();
    const licenseName = License.replace("-", " ") + " 4.0";
    return (
      <details>
        <summary>
          <b>Licencia:</b> &nbsp;
          {CC.map((e) => {
            const Icon = creative_svg[e].svg;
            const Label = creative_svg[e].label;
            return (
              <span key={e}>
                <abbr title={Label}>
                  <Icon width="30" height="30" />
                </abbr>
                &nbsp;
              </span>
            );
          })}
        </summary>
        <div className="details-content">
          <a
            href={repoURL}
            target="_blank"
            rel="noopener noreferrer"
          >{`${Title}`}</a>
          &nbsp; &copy; {Year} por{" "}
          <a href={profileURL} rel="noopener noreferrer">
            Jos&eacute; Hern&aacute;ndez
          </a>{" "}
          bajo la licencia{" "}
          <a href={`https://creativecommons.org/licenses/${licenseCode}/4.0/`}>
            {licenseName}
          </a>
        </div>
      </details>
    );
  } else if (License.toUpperCase() == "COPY") {
    return (
      <>
        <strong>{Title}</strong> &copy; {Year}{" "}
        <a href={profileURL} rel="noopener noreferrer">
          Jos&eacute; Hern&aacute;ndez.
        </a>
        {"  "}Todos los derechos reservados.
      </>
    );
  } else {
    return <span>José Hernández &copy;</span>;
  }
}
