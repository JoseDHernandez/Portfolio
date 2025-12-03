import { useEffect, useState } from "react";
import "../styles/pages/projects.scss";
import ProjectCard from "./ProjectCard";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as FilterIcon } from "../icons/filter.svg";
import { ReactComponent as CloseIcon } from "../icons/close.svg";

export default function ProjectSection({ projects }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [techFilter, setTechFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  //debounce de busqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // intervalo de debounce (400ms)
    return () => clearTimeout(handler);
  }, [search]);

  //limpiar filtros para la busqueda
  useEffect(() => {
    if (search.trim() !== "") {
      setTechFilter([]);
      setTypeFilter("");
    }
  }, [debouncedSearch]);

  //Filtro de tipo de tecnologías
  const handleTechChange = (tech) => {
    setTechFilter((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  //cerrar modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  //Filtro de proyectos
  const filtered = projects.filter(({ data }) => {
    const matchesSearch = data.Title.toLowerCase().includes(
      debouncedSearch.toLowerCase()
    );
    const matchesTech =
      techFilter.length === 0 ||
      techFilter.some((t) => data.Technologies.includes(t));
    const matchesType = typeFilter ? data.Type === typeFilter : true;
    return matchesSearch && matchesTech && matchesType;
  });

  //filtrar tipos de tecnologías
  const allTechnologies = [
    ...new Set(projects.flatMap((p) => p.data.Technologies)),
  ];
  const allTypes = [...new Set(projects.map((p) => p.data.Type))];
  //Limpiar filtros
  const handleClearFilters = () => {
    setTechFilter([]);
    setTypeFilter("");
  };

  return (
    <div className="project">
      <div className="project--inputs">
        <button
          className="button-text-icon-background-secondary project--filter-button"
          onClick={openModal}
          aria-haspopup="true"
          aria-expanded={modalOpen}
        >
          <FilterIcon /> Filtros
        </button>

        <div className="project--input">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            aria-label="Buscar proyectos"
            className="button-icon-background-secondary project--button"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <div
        className={`project--filters-modal ${modalOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filters-title"
        onClick={closeModal}
      >
        <div
          className="project--filters-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h2 id="filters-title" className="text-accent">
              Filtros
            </h2>
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
            <label htmlFor="typeFilter">Tipo de aplicación:</label> <br />{" "}
            <br />
            <select
              id="typeFilter"
              name="typeFilter"
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

          <p>Tecnologías:</p>
          <div className="project--filters-panel-technologies">
            {allTechnologies.map((tech) => (
              <div key={tech}>
                <input
                  type="checkbox"
                  value={tech}
                  checked={techFilter.includes(tech)}
                  onChange={() => handleTechChange(tech)}
                  name={`tech-${tech}`}
                  id={`tech-${tech}`}
                />
                <label htmlFor={`tech-${tech}`}>{tech}</label>
              </div>
            ))}
          </div>

          <div className="project--filters-actions">
            <button
              className="button-text-icon-background-secondary"
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      <div className="projects--grid-section">
        <div className="projects--grid">
          {filtered.length > 0 ? (
            filtered.map(({ data, slug }, index) => (
              <ProjectCard
                slug={slug}
                data={data}
                key={index + slug}
                index={index}
              />
            ))
          ) : (
            <p className="text-center">
              🤔 Parece que este proyecto aún no ha sido desarrollado... <br />
              <b>Cambia la búsqueda o elimina algunos filtros.</b>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
