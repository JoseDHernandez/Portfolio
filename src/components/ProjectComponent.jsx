import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import "../styles/components/_projectSearchAndFilters.scss";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as FilterIcon } from "../icons/filter.svg";
import { ReactComponent as CloseIcon } from "../icons/close.svg";

export default function ProjectSection({ projects }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [techFilter, setTechFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  const handleTechChange = (tech) => {
    setTechFilter((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

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
    <div className="project">
      <div className="project-inputs">
        <div className="project-input">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            aria-label="Buscar proyectos"
            className="button-icon-background-secondary project-button"
          >
            <SearchIcon />
          </button>
        </div>

        <button
          className="button-text-icon-secondary project-filter-button"
          onClick={openModal}
          aria-haspopup="true"
          aria-expanded={modalOpen}
        >
          <FilterIcon /> Filtros
        </button>
      </div>
      <div
        className={`project-filters-modal ${modalOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filters-title"
      >
        <div className="project-filters-panel">
          <div>
            <h3 id="filters-title" className="text-primary">
              Filtros
            </h3>
            <button
              autoFocus
              aria-label="Cerrar filtros"
              className="button-icon-background-secondary"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
          </div>

          <div>
            <label>Tipo de aplicación:</label> <br /> <br />
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
                <div key={tech}>
                  <input
                    type="checkbox"
                    value={tech}
                    checked={techFilter.includes(tech)}
                    onChange={() => handleTechChange(tech)}
                    name={tech}
                    id={tech}
                  />
                  <label htmlFor={tech}>{tech}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="projects-grid">
        {filtered.map(({ data, slug }) => (
          <ProjectCard slug={slug} data={data} key={slug} />
        ))}
      </div>
    </div>
  );
}
