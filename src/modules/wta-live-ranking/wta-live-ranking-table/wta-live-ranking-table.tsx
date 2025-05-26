"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/table";
import { cn } from "@/lib/utils";
import { WtaPlayer, WtaRanking } from "@/schemas/wta-ranking";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { use, useMemo } from "react";

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
				cell: ({ row }) => {
					return <div>{row.original.ranking}</div>;
				},
			}),
			columnHelper.accessor("name", {
				header: "Name",
				cell: ({ row }) => {
					return <div className="flex items-center justify-between gap-2">{row.original.name}</div>;
				},
			}),
			columnHelper.accessor("rankingChange", {
				header: "",
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
				cell: ({ row }) => {
					return <div>{row.original.country}</div>;
				},
			}),
			columnHelper.accessor("age", {
				header: "Age",
				cell: ({ row }) => {
					return <div>{row.original.age}</div>;
				},
			}),
			columnHelper.accessor("points", {
				header: "Points",
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
		<Table className="w-full table-fixed border-separate border-spacing-0 rounded-md border-1 border-zinc-200">
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead
								className={cn(
									"border-b-1 border-zinc-300 bg-zinc-100 not-last:border-r-1 first:rounded-tl-md last:rounded-tr-md",
									header.id === "name" && "border-r-zinc-100",
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
