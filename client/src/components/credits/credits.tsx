import React, { memo, useMemo } from "react";

import { IMAGE_SIZE_URL, RoutePathes } from "../../constants/constants";
import { IClientCredits } from "../../utils/adapters/credits";
import withLink from "../../utils/HOC/withLink";

import noImage from "./images/no-person.jpg";

interface ICreditsProps {
  data: IClientCredits[] | undefined
  className?: string;
}

interface ICreditCardProps {
  data: IClientCredits
}

export const CreditCard: React.FC<ICreditCardProps> = ({ data }: ICreditCardProps) => {
  const personImage = data.profilePath ? `${IMAGE_SIZE_URL.SMALL}/${data.profilePath}` : noImage;
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

const Credits: React.FC<ICreditsProps> = ({ data, className = "" }: ICreditsProps) => {
  const createCreditCards = useMemo(() => {
    return data?.map((element) => {
      const WrapperComponent = withLink(`${RoutePathes.ACTOR}/${element.id}`, CreditCard);
      return <WrapperComponent key={element.id} data={element} />;
    });
  }, [data]);
  return (
    <div className={`credits ${className}`}>
      { createCreditCards }
    </div>
  );
};

export default memo(Credits);
