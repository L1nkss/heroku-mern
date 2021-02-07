import { IServerCredits } from "../../services/types/types";

export interface IClientCredits {
  id: string;
  name: string;
  profilePath: string;
  character: string
}

export default class CreditsAdapter {
  static transformElement(element: IServerCredits) {
    return {
      name: element.name,
      character: element.character,
      profilePath: element.profile_path,
      id: element.id,
    };
  }

  static transformData(data: IServerCredits[]) {
    return data.map(this.transformElement);
  }
}
