import "../styles/components/_projectCard.scss";
const svgIcons = import.meta.glob("../icons/technologies/*.svg", {
  eager: true,
  import: "ReactComponent",
});
const iconMap = {};
for (const path in svgIcons) {
  const name = path.split("/").pop().replace(".svg", "");
  iconMap[name.toLowerCase()] = svgIcons[path];
}

export default function ProjectCard({ slug, data }) {
  const technologies = data.Technologies.map((tech) => {
    const Icon = iconMap[tech.toLowerCase()];
    return Icon ? <Icon key={tech + "-" + slug} title={tech} /> : null;
  });

  return (
    <a
      href={`/proyectos/${slug}`}
      className="project-card"
      aria-label={`Ver página del proyecto: ${data.Title}`}
    >
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
