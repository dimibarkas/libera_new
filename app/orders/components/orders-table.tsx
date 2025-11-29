'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, OrderStatus } from "./status-badge";
import { ActionMenu } from "./action-menu";
import { format } from "date-fns";

export type OrderRow = {
  _id: string;
  customer_name: string;
  status?: OrderStatus;
  date?: string;
  total?: number;
};

export type OrdersTableProps = {
  rows: OrderRow[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function OrdersTable({ rows, onView, onEdit, onDelete }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table className="table-zebra">
        <TableHeader>
          <TableRow>
            <TableHead>Kundenname</TableHead>
            <TableHead className="hidden md:table-cell">Datum</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell text-right">Summe</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                Keine Daten gefunden
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="font-medium">{row.customer_name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.date ? format(new Date(row.date), "dd.MM.yyyy") : "-"}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {row.status ? <StatusBadge status={row.status} /> : "-"}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-right">
                  {typeof row.total === "number" ? `${row.total.toFixed(2)} €` : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <ActionMenu
                    onView={() => onView(row._id)}
                    onEdit={() => onEdit(row._id)}
                    onDelete={() => onDelete(row._id)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
