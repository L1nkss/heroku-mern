import React, { useCallback, useState, memo } from "react";
import { IClientCredits } from "../../../../utils/adapters/credits";
import Credits from "../../../../components/credits/credits";

interface IFilmDetailsCreditsProps {
  data: IClientCredits[],
  showLimit: number
}

const FilmDetailsCredits: React.FC<IFilmDetailsCreditsProps> = ({ data, showLimit }: IFilmDetailsCreditsProps) => {
  const [showAllCast, setShowAllCast] = useState<boolean>(false);

  const castToShow = showAllCast ? data : data.slice(0, showLimit);

  const handleActorButtonClick = useCallback(() => {
    setShowAllCast((prevState) => !prevState);
  }, []);

  if (data.length === 0) return null;

  return (
    <section className="film-details__section">
      <header className="film-details__section-header">
        <h3 className="film-details__section-title">Actors</h3>
        <button onClick={handleActorButtonClick} type="button" className="button button--ghost">
          {showAllCast ? "Show less" : "Show more"}
        </button>
      </header>
      <Credits data={castToShow} className="film-details__credits" />
    </section>
  );
};

export default memo(FilmDetailsCredits);
