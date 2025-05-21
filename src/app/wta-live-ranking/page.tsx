import { env } from "@/config/env";
import { WtaLiveRankingTable } from "@/modules/wta-live-ranking/wta-live-ranking-table/wta-live-ranking-table";
import { wtaRankingSchema } from "@/schemas/wta-ranking";
import { Suspense } from "react";

const fetchWtaLiveRanking = async () => {
  const res = await fetch(`${env.API_URL}/live-ranking/wta`, {
    cache: "no-store",
  });
  const data = await res.json();
  const validatedData = wtaRankingSchema.parse(data);
  return validatedData;
};

const WtaLiveRanking = async () => {
  const wtaLiveRankingPromise = fetchWtaLiveRanking();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WtaLiveRankingTable wtaLiveRankingPromise={wtaLiveRankingPromise} />
    </Suspense>
  );
};

export default WtaLiveRanking;
