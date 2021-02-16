import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from "react";
import { RouteMatchProps } from "../../../constants/types/types";
import api from "../../../services/api";
import ActorAdapter, { IClientActorDetails } from "../../../utils/adapters/actor";
import FilmAdapter from "../../../utils/adapters/film";
import { IClientFilmData } from "../../../redux/reducers/films/types/types";
import Loader from "../../../components/loader/loader";
import { IMAGE_SIZE_URL, RoutePathes } from "../../../constants/constants";
import { checkResultToUndefined, IDetailsInformationInit, renderDetailsInformations } from "../helpers/helpers";
import withLink from "../../../utils/HOC/withLink";
import FilmCard from "../../../components/film-card/film-card";

interface IActorState {
  information: IClientActorDetails,
  films: IClientFilmData[]
}

const Actor = ({ match }: RouteMatchProps) => {
  const { id } = match.params;
  const [details, setDetails] = useState<IActorState>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadActorDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getPersonDetails(id);
      const discoverReponse = await api.discoverFilms({ sort_by: "primary_release_date.desc", with_people: id });

      setDetails({
        information: ActorAdapter.transformElement(response.data),
        films: FilmAdapter.transformData(discoverReponse.data.results),
      });
    } catch (e) {
      console.log("Ошибка при загрузке информации о фильме", e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadActorDetails();
  }, [id]);

  const films = useMemo(() => {
    return details?.films.map((element) => {
      const WrapperComponent = withLink(`${RoutePathes.FILM_DETAILS}/${element.id}`, FilmCard);
      return <WrapperComponent data={element} key={element.id} size="small" />;
    });
  }, [details, id]);

  // Фильмы, которые возможно понравятся
  const moreFilms = useMemo(() => {
    if (details?.films?.length === 0) return undefined;
    /* todo Сделать как компонент Films с пропсом размер */
    return (
      <div className="films films--small">
        {films}
      </div>
    );
  }, [details]);

  const placeOfBirth = useMemo(() => {
    if (!details?.information.placeOfBirth) return undefined;

    return <p className="actor__info-text">{details?.information.placeOfBirth}</p>;
  }, [details]);

  const dateOfBirhday = useMemo(() => {
    if (!details?.information.birthday) return undefined;

    return <p className="actor__info-text">{details?.information.birthday}</p>;
  }, [details]);

  const dateOfDeathday = useMemo(() => {
    if (!details?.information.deathday) return undefined;

    return <p className="actor__info-text">{details?.information.deathday}</p>;
  }, [details]);

  const biography = useMemo(() => {
    if (!details?.information.biography) return undefined;

    return <p className="actor__info-text">{details?.information.biography}</p>;
  }, [details]);

  // Детальная информация об актере
  const actorDetailsInformation = useMemo(() => {
    const data: IDetailsInformationInit[] = [
      {
        id: 1,
        header: "Place of Birth",
        result: placeOfBirth,
        extraClass: "actor__info--row",
      },
      {
        id: 2,
        header: "Birthday",
        result: dateOfBirhday,
        extraClass: "actor__info--row",
      },
      {
        id: 3,
        header: "Deathday",
        result: dateOfDeathday,
        extraClass: "actor__info--row",
      },
      {
        id: 4,
        header: "Biography",
        result: biography,
      },
    ];

    return data.filter(checkResultToUndefined);
  }, [details]);

  if (loading) return <Loader />;
  return (
    <section>
      <div
        style={
            {
              backgroundImage: (
                "linear-gradient(rgba(52, 41, 49, 0.8), rgba(0, 0, 0, 0.85))"),
              minHeight: "560px",
            }
          }
      >
        <div className="content-wrapper actor">
          <div className="actor__image-wrapper">
            <img src={`${IMAGE_SIZE_URL.BIG}/${details?.information.profilePath}`} alt={details?.information.name} />
          </div>
          <div className="actor__content">
            <header className="actor__header">
              <h2 className="actor__title">{details?.information.name}</h2>
            </header>
            <div>
              { renderDetailsInformations(actorDetailsInformation, "actor") }
            </div>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <h3>Filmography</h3>
        {moreFilms}
      </div>
    </section>
  );
};

export default memo(Actor);
