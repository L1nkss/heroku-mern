import { RouteComponentProps } from "react-router-dom";

type GenreName = "Popular" | "Now playing" | "Top Rated" | "Upcoming";

type TRouteParams = { id: string };

// Тип для роутинга с match
export type RouteMatchProps = RouteComponentProps<TRouteParams>;
