import { env } from "@/config/env";
import { WtaLiveRankingTable } from "@/modules/wta-live-ranking/wta-live-ranking-table/wta-live-ranking-table";
import { wtaRankingSchema } from "@/schemas/wta-ranking";
import { Metadata } from "next";
import { Suspense } from "react";

async function fetchWtaLiveRanking() {
  const res = await fetch(`${env.API_URL}/live-ranking/wta`, {
    cache: "no-store",
  });
  const data = await res.json();
  const validatedData = wtaRankingSchema.parse(data);
  return validatedData;
}

export const metadata: Metadata = {
  title: "WTA Live Rankings",
  description: "WTA Live Rankings",
};

function WtaLiveRanking() {
  const wtaLiveRankingPromise = fetchWtaLiveRanking();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="max-w-screen-lg mx-auto mt-10">
        <WtaLiveRankingTable wtaLiveRankingPromise={wtaLiveRankingPromise} />
      </main>
    </Suspense>
  );
}

export default WtaLiveRanking;
