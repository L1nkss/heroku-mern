import { IServerReview } from "../../services/types/types";

export interface IClientReview {
  author: string;
  content: string;
  id: string
  create: string;
}

export default class ReviewsAdapter {
  static transformElement(element: IServerReview) {
    return {
      author: element.author,
      content: element.content,
      create: element.created_at,
      id: element.id,
    };
  }

  static transformData(data: IServerReview[]) {
    return data.map(this.transformElement);
  }
}
