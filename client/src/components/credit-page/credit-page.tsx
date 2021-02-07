import React, {
  memo, useCallback, useEffect, useState,
} from "react";
import Credits from "../credits/credits";
import { MyProps } from "../film-details/film-details";
import api from "../../services/api";
import Loader from "../loader/loader";
import CreditsAdapter, { IClientCredits } from "../../utils/adapters/credits";

const CreditPage: React.FC<MyProps> = ({ match }: MyProps) => {
  const [credits, setCredits] = useState<IClientCredits[]>();
  const [loading, setLoading] = useState(false);
  const { id } = match.params;

  const loadCredits = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.getCredits(id);
      setCredits(CreditsAdapter.transformData(response.data.cast));
    } catch (e) {
      console.log("Ошибка", e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCredits();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="content-wrapper">
      <Credits data={credits} showBackButton />
    </div>
  );
};

export default memo(CreditPage);
