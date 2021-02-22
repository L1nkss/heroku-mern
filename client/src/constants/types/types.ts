import { RouteComponentProps } from "react-router-dom";

type TRouteParams = { id: string };

// Тип для роутинга с match
export type RouteMatchProps = RouteComponentProps<TRouteParams>;
