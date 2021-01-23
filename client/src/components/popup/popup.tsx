import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

interface IPopupProps {
  children: JSX.Element | React.ReactNode; // может возвращать как разметку, так и React Component
  closeClickCallback: () => void;
}

const Popup: React.FC<IPopupProps> = ({ closeClickCallback, children }: IPopupProps) => {
  // Добавляем overflow: hidden для body, чтобы нельзя было скроллить вниз, пока popup открыт
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="popup">
      <div className="popup__content">
        <span role="presentation" className="popup__close-icon" onClick={closeClickCallback}>
          <FiX />
        </span>
        {children}
      </div>
    </div>
  );
};

export default Popup;
