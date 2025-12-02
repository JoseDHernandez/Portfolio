import { useEffect } from "react";
import { ReactComponent as ArrowIcon } from "../icons/arrow-right.svg";
import { ReactComponent as ThemeIcon } from "../icons/theme.svg";
import "../styles/components/_topbutton.scss";

export default function TopButton() {
  useEffect(() => {
    const scrollBtn = document.getElementById("Top-btn");
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    if (!scrollBtn || !themeToggleBtn) return;
    //detectar preferencia
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme) => {
      if (theme === "dark") {
        body.classList.add("dark-theme");
        themeToggleBtn.setAttribute("aria-checked", "true");
      } else {
        body.classList.remove("dark-theme");
        themeToggleBtn.setAttribute("aria-checked", "false");
      }
    };
    //guardado del tema
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme(systemPrefersDark.matches ? "dark" : "light");
    }
    //tema del sistema
    const handleSystemChange = (event) => {
      const saved = localStorage.getItem("theme");

      // Solo seguir preferencias del sistema si NO hay una elección manual
      if (!saved) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    systemPrefersDark.addEventListener("change", handleSystemChange);
    //cambiar tema
    const toggleTheme = () => {
      const isDark = body.classList.toggle("dark-theme");

      themeToggleBtn.setAttribute("aria-checked", isDark ? "true" : "false");

      localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    themeToggleBtn.addEventListener("click", toggleTheme);

    //mostrar
    const handleScroll = () => {
      const show = window.scrollY > 300;
      scrollBtn.style.display = show ? "block" : "none";
      //themeToggleBtn.style.display = show ? "block" : "none";
    };

    window.addEventListener("scroll", handleScroll);
    //subir
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    //reiniciar
    return () => {
      window.removeEventListener("scroll", handleScroll);
      themeToggleBtn.removeEventListener("click", toggleTheme);
    };
  }, []);

  return (
    <>
      <button
        id="Top-btn"
        title="Volver arriba"
        className="button-icon-background-accent"
        aria-label="Volver arriba"
        style={{ display: "none" }}
      >
        <ArrowIcon />
      </button>
      <button
        id="theme-toggle"
        aria-label="Cambiar tema"
        aria-checked="false"
        role="switch"
      >
        <ThemeIcon />
      </button>
    </>
  );
}
