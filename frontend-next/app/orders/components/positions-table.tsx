"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddPositionInline } from "./add-position-inline";
import { TableActionButtons } from "./table-action-buttons";

interface PositionsTableProps {
  positions: { id?: string; name: string; number: number }[];
  onRemove: (index: number) => void;
  onAdd: (item: { name: string; number: number }) => void;
  onOpenDialog: () => void;
  token: string | null;
}

export function PositionsTable({ positions, onRemove, onAdd, onOpenDialog, token }: PositionsTableProps) {
  return (
    <section className="mt-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Positionen</h2>
          <p className="text-sm text-muted-foreground">Artikel und Mengen für diese Bestellung verwalten.</p>
        </div>
        <Button type="button" className="self-start sm:hidden" onClick={onOpenDialog}>
          Position hinzufügen
        </Button>
      </div>
      <Separator />
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artikel</TableHead>
              <TableHead className="w-32 text-center">Anzahl</TableHead>
              <TableHead className="w-32 text-center">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AddPositionInline token={token} onAdd={onAdd} />
            {positions.map((position, index) => (
              <TableRow key={position.id ?? `${position.name}-${index}`}>
                <TableCell>{position.name}</TableCell>
                <TableCell className="text-center">{position.number}</TableCell>
                <TableCell className="text-center">
                  <TableActionButtons onDelete={() => onRemove(index)} />
                </TableCell>
              </TableRow>
            ))}
            {positions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                  Noch keine Positionen vorhanden.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
      <div className="hidden md:flex md:justify-end">
        <Button type="button" variant="outline" onClick={onOpenDialog}>
          Position über Dialog hinzufügen
        </Button>
      </div>
    </section>
  );
}
