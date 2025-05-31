"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/table";
import { countries } from "@/consts/flags-map";
import { cn } from "@/lib/utils";
import { WtaPlayer, WtaRanking } from "@/schemas/wta-ranking";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import React, { use, useMemo } from "react";

export const WtaLiveRankingTable = ({
	wtaLiveRankingPromise,
}: {
	wtaLiveRankingPromise: Promise<WtaRanking>;
}) => {
	const data = use(wtaLiveRankingPromise);

	const columnHelper = createColumnHelper<WtaPlayer>();

	const columns = useMemo(() => {
		return [
			columnHelper.accessor("ranking", {
				header: "#",
				size: 2,
				cell: ({ row }) => {
					return <div>{row.original.ranking}</div>;
				},
			}),
			columnHelper.accessor("name", {
				header: "Name",
				size: 20,
				cell: ({ row }) => {
					const countryFlag = countries[row.original.country as keyof typeof countries];
					return (
						<div className="flex items-center gap-2 ">
							{countryFlag && (
								<Image src={countryFlag.flagUrl} alt={countryFlag.name} height={16} width={16} />
							)}
							{row.original.name}
						</div>
					);
				},
			}),
			columnHelper.accessor("rankingChange", {
				header: "",
				size: 18,
				cell: ({ row }) => {
					return (
						<div
							className={cn(
								{
									"text-green-600": row.original.rankingChange && row.original.rankingChange > 0,
									"text-red-600": row.original.rankingChange && row.original.rankingChange < 0,
								},
								"flex items-center justify-center",
							)}
						>
							{row.original.rankingChange && (row.original.rankingChange > 0 ? "+" : "")}
							{row.original.rankingChange}
						</div>
					);
				},
			}),
			columnHelper.accessor("country", {
				header: "Country",
				size: 10,
				cell: ({ row }) => {
					return <div>{row.original.country}</div>;
				},
			}),
			columnHelper.accessor("currentTournament", {
				header: "Current Tournament",
				cell: ({ row }) => {
					return <div>{row.original.currentTournament}</div>;
				},
			}),
			columnHelper.accessor("pointsChange", {
				header: "Points",
				size: 20,
				cell: ({ row }) => {
					return (
						<div
							className={cn(
								{
									"text-green-600": row.original.pointsChange && row.original.pointsChange > 0,
									"text-red-600": row.original.pointsChange && row.original.pointsChange < 0,
								},
								"flex items-end justify-end",
							)}
						>
							{row.original.pointsChange && (row.original.pointsChange > 0 ? "+" : "")}
							{row.original.pointsChange}
						</div>
					);
				},
			}),
			columnHelper.accessor("points", {
				header: "",
				size: 20,
				cell: ({ row }) => {
					return <div>{row.original.points}</div>;
				},
			}),
		];
	}, [columnHelper]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table className="border-1 w-full table-auto border-separate border-spacing-0 rounded-md border-zinc-200">
			<colgroup>
				{table.getHeaderGroups().map((headerGroup) =>
					headerGroup.headers.map((header) => {
						return <col key={header.id} style={{ width: `${header.getSize()}%` }} />;
					}),
				)}
			</colgroup>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead
								className={cn(
									"border-b-1 not-last:border-r-1 border-zinc-300 bg-zinc-100 first:rounded-tl-md last:rounded-tr-md",
									{
										"border-r-zinc-100": header.id === "name" || header.id === "pointsChange",
									},
								)}
								key={header.id}
								colSpan={header.colSpan}
							>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getFilteredRowModel().rows.map((row) => (
					<TableRow key={row.id} className="even:bg-zinc-100">
						{row.getVisibleCells().map((cell) => (
							<TableCell
								key={cell.id}
								className="[tr:not(:last-child)_&]:border-b-1 [tr:not(:last-child)_&]:border-zinc-300"
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
