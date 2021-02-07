import React, { memo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import history from "../../utils/history";

interface IBackHistoryProps {
  className?:string;
}

const BackHistory: React.FC<IBackHistoryProps> = ({ className }: IBackHistoryProps) => {
  const handleClick = () => {
    history.goBack();
  };
  return (
    <button type="button" className={`back-history ${className}`} onClick={handleClick}>
      <AiOutlineArrowLeft className="back-history__icon" />
    </button>
  );
};

export default memo(BackHistory);
