"use client";

import { WtaRanking } from "@/schemas/wta-ranking";
import { use } from "react";

export const WtaLiveRankingTable = ({
  wtaLiveRankingPromise,
}: {
  wtaLiveRankingPromise: Promise<WtaRanking>;
}) => {
  const data = use(wtaLiveRankingPromise);

  return data.map((player) => (
    <div className="flex flex-row gap-1" key={player.name + player.ranking}>
      <div>{player.ranking}.</div>
      <div>{player.name}</div>
      <div>Points: {player.points}</div>
    </div>
  ));
};
