import "../styles/components/_projectCard.scss";
const svgIcons = import.meta.glob("/src/icons/technologies/*.svg", {
  eager: true,
  import: "ReactComponent",
});
const iconMap = {};
for (const path in svgIcons) {
  const name = path.split("/").pop().replace(".svg", "");
  iconMap[name.toLowerCase()] = svgIcons[path];
}

export default function ProjectCard({ slug, data, index }) {
  const technologies = data.Technologies.map((tech) => {
    const Icon = iconMap[tech.toLowerCase()];
    return Icon ? <Icon key={tech + "-" + slug} title={tech} /> : null;
  });
  const isFirst = index == 0;
  return (
    <a
      href={`/proyectos/${slug}/`}
      className="project--card"
      aria-label={`Ir a la página del proyecto: ${data.Title}`}
    >
      <div className="project--card-image-div">
        <picture>
          <source
            srcSet={data.Cover_path_full.src}
            media="(min-width: 1200px)"
          />
          <source srcSet={data.Cover_path_xl.src} media="(min-width: 1024px)" />
          <source srcSet={data.Cover_path_md.src} media="(min-width: 500px)" />
          <img
            src={data.Cover_path.src}
            alt={data.Title}
            loading={isFirst ? "eager" : "lazy"}
            decoding="async"
            width={isFirst ? "620" : "600"}
            fetchPriority={isFirst ? "high" : "auto"}
            className="project--card-image"
            transition:name={`project-${data.Title}`}
          />
        </picture>
      </div>
      <div className="project--card-title">
        <strong transition:name={`project-title-${data.Title}`}>
          {data.Title}
        </strong>
      </div>
      <div className="project--card-description">
        {isFirst
          ? data.Description.split("\n").map((p, index) => (
              <p key={slug + index}>{p}</p>
            ))
          : data.Short_description}
      </div>
      <div className="project--card-bottom">
        <div className="project--card-technologies">{technologies}</div>
        <div className="project--card-more">
          <span>Ver m&aacute;s &#8594;</span>
        </div>
      </div>
    </a>
  );
}
