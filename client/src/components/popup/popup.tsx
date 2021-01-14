import React from "react";

interface IPopupProps {
  children: JSX.Element | React.ReactNode; // может возвращать как разметку, так и React Component
  closeClickCallback: () => void;
}

const Popup: React.FC<IPopupProps> = ({ closeClickCallback, children }: IPopupProps) => {
  return (
    <div className="popup">
      <div className="popup__content">
        <span role="presentation" className="popup__close-icon" onClick={closeClickCallback}>
          <i className="fas fa-times" />
        </span>
        {children}
      </div>
    </div>
  );
};

export default Popup;
