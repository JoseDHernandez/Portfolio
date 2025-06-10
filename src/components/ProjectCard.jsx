import "../styles/components/_projectCard.scss";
import { ReactComponent as Astro } from "../icons/technologies/Astro.svg";
import { ReactComponent as Bootstrap } from "../icons/technologies/Bootstrap.svg";
import { ReactComponent as Css } from "../icons/technologies/Css.svg";
import { ReactComponent as Express } from "../icons/technologies/Express.svg";
import { ReactComponent as Figma } from "../icons/technologies/Figma.svg";
import { ReactComponent as Git } from "../icons/technologies/Git.svg";
import { ReactComponent as Github } from "../icons/technologies/Github.svg";
import { ReactComponent as Html } from "../icons/technologies/Html.svg";
import { ReactComponent as Java } from "../icons/technologies/Java.svg";
import { ReactComponent as Javascript } from "../icons/technologies/Javascript.svg";
import { ReactComponent as Markdown } from "../icons/technologies/Markdown.svg";
import { ReactComponent as Mongodb } from "../icons/technologies/Mongodb.svg";
import { ReactComponent as Mysql } from "../icons/technologies/Mysql.svg";
import { ReactComponent as Nodejs } from "../icons/technologies/Nodejs.svg";
import { ReactComponent as Penpot } from "../icons/technologies/Penpot.svg";
import { ReactComponent as ReactIcon } from "../icons/technologies/React.svg";
import { ReactComponent as Socketio } from "../icons/technologies/Socketio.svg";
import { ReactComponent as Tailwind } from "../icons/technologies/Tailwind.svg";

export default function ProjectCard({ slug, data }) {
  const iconMap = {
    Astro,
    Bootstrap,
    Css,
    Express,
    Figma,
    Git,
    Github,
    Html,
    Java,
    Javascript,
    Markdown,
    Mongodb,
    Mysql,
    Nodejs,
    Penpot,
    React: ReactIcon,
    Socketio,
    Tailwind,
  };

  const technologies = data.technologies.map((tech) => {
    const Icon = iconMap[tech];
    return Icon && <Icon key={tech} title={tech} />;
  });

  return (
    <a href={`/proyectos/${slug}`} className="project-card">
      <img
        src={`/src/assets/projects/${slug + "/" + data.Cover_path}`}
        alt={data.Title}
        loading="lazy"
        decoding="async"
        width="230px"
      />
      <strong>{data.Title}</strong>
      <small>{data.Short_description}</small>
      <span>{technologies}</span>
    </a>
  );
}
