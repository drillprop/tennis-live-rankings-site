"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
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
        header: "Ranking",
        cell: ({ row }) => {
          return <div>{row.original.ranking}</div>;
        },
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.name} {row.original.rankingChange}
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
    <Table className="w-full border-1 border-zinc-200 rounded-md table-fixed border-separate border-spacing-0">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                className="border-b-1 border-zinc-200 bg-zinc-50 border-separate border-spacing-0 not-last:border-r-1 first:rounded-tl-md last:rounded-tr-md"
                key={header.id}
                colSpan={header.colSpan}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getFilteredRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
