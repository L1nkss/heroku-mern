import { IServerActorDetails } from "../../services/types/types";

export interface IClientActorDetails {
  biography: string
  birthday: string
  deathday: string
  id: number
  name: string
  placeOfBirth: string
  profilePath: string
}

export default class ActorAdapter {
  static transformElement(element: IServerActorDetails): IClientActorDetails {
    return {
      biography: element.biography,
      birthday: element.birthday,
      deathday: element.deathday,
      id: element.id,
      name: element.name,
      placeOfBirth: element.place_of_birth,
      profilePath: element.profile_path,
    };
  }
}
