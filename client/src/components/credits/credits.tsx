import React, { memo, useMemo } from "react";
import { IClientCredits } from "../../utils/adapters/credits";
import { IMAGE_SIZE_URL, RoutePathes } from "../../constants/constants";
import BackHistory from "../back-history/back-history";
import withLink from "../../utils/HOC/withLink";

import noImage from "./images/no-person.jpg";

interface ICreditsProps {
  data: IClientCredits[] | undefined
  showBackButton?: boolean;
}

interface ICreditCardProps {
  data: IClientCredits
}

// todo перенести в компонент
export const CreditCard: React.FC<ICreditCardProps> = ({ data }: ICreditCardProps) => {
  const personImage = data.profilePath ? `${IMAGE_SIZE_URL.SMALL}/${data.profilePath}` : noImage;
  return (
    <div key={data.id} className="cast">
      <div className="cast__image">
        <img src={personImage} alt={`${data.name}`} />
      </div>
      <div>
        <h3>{data.name}</h3>
        <p>{data.character}</p>
      </div>
    </div>
  );
};

const Credits: React.FC<ICreditsProps> = ({ data, showBackButton = false }: ICreditsProps) => {
  const createCreditCards = useMemo(() => {
    return data?.map((element) => {
      const WrapperComponent = withLink(`${RoutePathes.ACTOR}/${element.id}`, CreditCard);
      return <WrapperComponent data={element} />;
    });
  }, [data]);
  return (
    <div className="credits">
      { createCreditCards }
      { showBackButton && <BackHistory className="credits__back-button" /> }
    </div>
  );
};

export default memo(Credits);
