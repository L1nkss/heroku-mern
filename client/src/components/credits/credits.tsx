import React, { memo, useMemo } from "react";
import { IClientCredits } from "../../utils/adapters/credits";
import { IMAGE_SIZE_URL, RoutePathes } from "../../constants/constants";
import BackHistory from "../back-history/back-history";
import withLink from "../../utils/HOC/withLink";

import noImage from "./images/no-person.jpg";

interface ICreditsProps {
  data: IClientCredits[] | undefined
  showBackButton?: boolean;
  className?: string;
}

interface ICreditCardProps {
  data: IClientCredits
}

// todo перенести в компонент
export const CreditCard: React.FC<ICreditCardProps> = ({ data }: ICreditCardProps) => {
  const personImage = data.profilePath ? `${IMAGE_SIZE_URL.BIG}/${data.profilePath}` : noImage;
  return (
    <div key={data.id} className="cast">
      <div className="cast__image">
        <img src={personImage} alt={`${data.name}`} />
      </div>
      <div className="cast__wrapper">
        <h3>{data.name}</h3>
        <p className="cast__name">{data.character}</p>
      </div>
    </div>
  );
};

const Credits: React.FC<ICreditsProps> = ({ data, showBackButton = false, className = "" }: ICreditsProps) => {
  const createCreditCards = useMemo(() => {
    return data?.map((element) => {
      const WrapperComponent = withLink(`${RoutePathes.ACTOR}/${element.id}`, CreditCard);
      return <WrapperComponent key={element.id} data={element} />;
    });
  }, [data]);
  return (
    <div className={`credits ${className}`}>
      { createCreditCards }
      { showBackButton && <BackHistory className="credits__back-button" /> }
    </div>
  );
};

export default memo(Credits);
