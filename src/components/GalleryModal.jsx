import { useEffect, useState, useRef } from "react";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import "../styles/components/_galleryModal.scss";
export default function GalleryModal() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const modalRef = useRef(null);
  const imgRef = useRef(null);
  const thumbsRef = useRef(null);
  const closeBtnRef = useRef(null);

  // 🔍 Zoom config
  const zoomStep = 0.2;
  const maxZoom = 15;
  const [zoomLevel, setZoomLevel] = useState(1);

  // ============================
  // Inicialización y atajos de teclado
  // ============================
  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll(".feature-card img"));
    setImages(imgs);

    const handleKeyDown = (e) => {
      if (!open) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // ============================
  // Listeners de imágenes de la página
  // ============================
  useEffect(() => {
    if (images.length === 0) return;
    images.forEach((img, i) => {
      img.addEventListener("click", () => openModal(i));
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(i);
        }
      });
    });

    return () => {
      images.forEach((img) => {
        img.replaceWith(img.cloneNode(true)); // limpia listeners
      });
    };
  }, [images]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setOpen(true);
    setZoomLevel(1);
    setTimeout(() => closeBtnRef.current?.focus(), 100);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const showNext = () => setCurrentIndex((i) => (i + 1) % images.length);
  const showPrev = () =>
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) closeModal();
  };

  // ============================
  // Actualizar imagen del modal
  // ============================
  useEffect(() => {
    if (!imgRef.current || images.length === 0) return;
    const source = images[currentIndex];
    Array.from(imgRef.current.attributes).forEach((a) =>
      imgRef.current.removeAttribute(a.name)
    );
    Array.from(source.attributes).forEach((a) =>
      imgRef.current.setAttribute(a.name, a.value)
    );
    imgRef.current.className = "modal-img";
  }, [currentIndex, images]);

  // ============================
  // Zoom con el ratón (PC)
  // ============================
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      let newZoom = zoomLevel + delta * zoomStep;
      newZoom = Math.max(1, Math.min(maxZoom, newZoom));
      setZoomLevel(newZoom);
      img.style.setProperty("--zoom", newZoom);
    };

    img.addEventListener("wheel", handleWheel, { passive: false });
    return () => img.removeEventListener("wheel", handleWheel);
  }, [zoomLevel]);

  // ============================
  // Zoom y movimiento en móvil
  // ============================
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    let startDist = 0;
    let lastZoom = zoomLevel;
    let startX = 0;
    let startY = 0;
    let currentX = 50;
    let currentY = 50;
    let lastTap = 0;

    const getDistance = (t1, t2) => {
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        startDist = getDistance(e.touches[0], e.touches[1]);
        lastZoom = zoomLevel;
      } else if (e.touches.length === 1 && zoomLevel > 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }

      // Doble toque para resetear zoom
      const now = new Date().getTime();
      if (now - lastTap < 300) {
        setZoomLevel(1);
        img.style.setProperty("--zoom", 1);
      }
      lastTap = now;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const newDist = getDistance(e.touches[0], e.touches[1]);
        let newZoom = lastZoom * (newDist / startDist);
        newZoom = Math.max(1, Math.min(maxZoom, newZoom));
        setZoomLevel(newZoom);
        img.style.setProperty("--zoom", newZoom);
      } else if (e.touches.length === 1 && zoomLevel > 1) {
        e.preventDefault();
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = Math.max(0, Math.min(100, currentX + dx / 5));
        currentY = Math.max(0, Math.min(100, currentY + dy / 5));
        img.style.setProperty("--x", `${currentX}%`);
        img.style.setProperty("--y", `${currentY}%`);
      }
    };

    img.addEventListener("touchstart", handleTouchStart, { passive: false });
    img.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      img.removeEventListener("touchstart", handleTouchStart);
      img.removeEventListener("touchmove", handleTouchMove);
    };
  }, [zoomLevel]);

  // ============================
  // Movimiento del cursor (PC)
  // ============================
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  };

  // ============================
  // Renderizado
  // ============================
  return (
    <div
      className={`modal ${open ? "open" : ""}`}
      aria-modal="true"
      role="dialog"
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <button
        className="modal-close button-icon-background-primary"
        aria-label="Cerrar galería"
        onClick={closeModal}
        ref={closeBtnRef}
      >
        <CloseIcon />
      </button>

      <img
        className="modal-img"
        alt=""
        ref={imgRef}
        onMouseMove={handleMouseMove}
        style={{
          "--zoom": zoomLevel,
          "--x": "50%",
          "--y": "50%",
          transform: `scale(${zoomLevel})`,
          transformOrigin: "var(--x) var(--y)",
          cursor: zoomLevel > 1 ? "grab" : "crosshair",
        }}
      />

      <div className="modal-thumbnails" role="list" ref={thumbsRef}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.currentSrc || img.src}
            alt={img.alt}
            className={i === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
