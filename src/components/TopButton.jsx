import { useEffect } from "react";
import { ReactComponent as ArrowIcon } from "../icons/arrow-right.svg";
import "../styles/components/_topbutton.scss";

export default function TopButton() {
  useEffect(() => {
    const scrollBtn = document.getElementById("Top-btn");

    if (!scrollBtn) return;

    const handleScroll = () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    };

    window.addEventListener("scroll", handleScroll);

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Limpieza de eventos
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      id="Top-btn"
      title="Volver arriba"
      className="button-icon-background-accent"
      aria-label="Volver arriba"
      style={{ display: "none" }}
    >
      <ArrowIcon />
    </button>
  );
}
