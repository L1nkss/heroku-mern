import React, {
  useMemo, memo, useEffect, useRef, useCallback,
} from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";

interface IPopupProps {
  children: JSX.Element;
  handleCloseClick: () => void
}

const modalContainer = document.getElementById("modal");

const Popup: React.FC<IPopupProps> = ({ children, handleCloseClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Callback функция для клика вне окна
  const handleOutsideClick = useCallback((evt) => {
    if (containerRef.current && !containerRef.current.contains(evt.target)) {
      handleCloseClick();
    }
  }, [handleCloseClick]);
  // Добавляем overflow: hidden для body, чтобы нельзя было скроллить вниз, пока popup открыт
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const basicContainer = useMemo(() => {
    return (
      <div className="popup">
        <div ref={containerRef} className="popup__content">
          <span role="presentation" className="popup__close-icon" onClick={handleCloseClick}>
            <FiX />
          </span>
          {children}
        </div>
      </div>
    );
  }, [children, handleCloseClick]);

  return modalContainer ? ReactDOM.createPortal(basicContainer, modalContainer) : null;
};

export default memo(Popup);
