import { z } from "zod";

export const wtaPlayerSchema = z.object({
	ranking: z.number(),
	name: z.string(),
	age: z.number(),
	points: z.number(),
	country: z.string(),
	countryRank: z.number(),
	rankingChange: z.number().nullable(),
	pointsChange: z.number().nullable(),
	currentTournament: z.string().nullable(),
	next: z.number().nullable(),
	max: z.number().nullable(),
	careerHigh: z.number(),
});

export const wtaRankingSchema = z.array(wtaPlayerSchema);

export type WtaPlayer = z.infer<typeof wtaPlayerSchema>;
export type WtaRanking = z.infer<typeof wtaRankingSchema>;
