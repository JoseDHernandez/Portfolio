import { URL_PROFILE } from "astro:env/server";
const profileURL = URL_PROFILE ?? "#";
export default function GetLicense({
  License,
  Work_link,
  Title,
  Year,
  Authors,
}) {
  const repoURL = Work_link ?? "#";
  if (License?.startsWith("CC")) {
    const CC = License.split("-");
    const licenseCode = License.slice(3).toLowerCase();
    const licenseName = License.replace("-", " ") + " 4.0";
    return (
      <span>
        <a
          href={repoURL}
          target="_blank"
          rel="noopener noreferrer"
        >{`${Title}`}</a>
        &nbsp; &copy; {Year} por{" "}
        <a
          href={Authors != undefined ? repoURL : profileURL}
          rel="noopener noreferrer"
        >
          {Authors ?? `José Hernández`}
        </a>{" "}
        bajo la licencia{" "}
        <a
          href={`https://creativecommons.org/licenses/${licenseCode}/4.0/`}
          target="_blank"
        >
          {licenseName}
        </a>
      </span>
    );
  } else if (License.toUpperCase() == "COPY") {
    return (
      <span>
        <strong>{Title}</strong> &copy; {Year}{" "}
        <a href={profileURL} rel="noopener noreferrer">
          Jos&eacute; Hern&aacute;ndez.
        </a>
        {"  "}Todos los derechos reservados.
      </span>
    );
  } else {
    return <span>José Hernández &copy;</span>;
  }
}
