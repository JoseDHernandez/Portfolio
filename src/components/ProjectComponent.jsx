import { useState } from "react";
import { Icon } from "astro-icon/components";

export default function ProjectSection({ projects }) {
  const [search, setSearch] = useState("");
  const [techFilter, setTechFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  const handleTechChange = (tech) => {
    setTechFilter((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const filtered = projects.filter(({ data }) => {
    const matchesSearch = data.Title.toLowerCase().includes(
      search.toLowerCase()
    );
    const matchesTech =
      techFilter.length === 0 ||
      techFilter.every((t) => data.technologies.includes(t));
    const matchesType = typeFilter ? data.type === typeFilter : true;
    return matchesSearch && matchesTech && matchesType;
  });

  const allTechnologies = [
    ...new Set(projects.flatMap((p) => p.data.technologies)),
  ];
  const allTypes = [...new Set(projects.map((p) => p.data.type))];

  return (
    <section>
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Buscar</button>
      </div>

      <details>
        <summary>Filtros</summary>
        <div>
          <div>
            <label>Tipo de aplicación:</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {allTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Tecnologías:</p>
            <div>
              {allTechnologies.map((tech) => (
                <label key={tech}>
                  <input
                    type="checkbox"
                    value={tech}
                    checked={techFilter.includes(tech)}
                    onChange={() => handleTechChange(tech)}
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>
        </div>
      </details>

      <div>
        {filtered.map(({ data, slug }) => (
          <a key={slug} href={`/proyectos/${slug}`}>
            <img
              src={`/src/assets/projects/${slug + "/" + data.Cover_path}`}
              alt={data.Title}
              loading="lazy"
              decoding="async"
              width="200px"
            />
            <strong>{data.Title}</strong>
            <p>{data.Short_description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
