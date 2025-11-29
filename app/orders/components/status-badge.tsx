'use client';

import { Badge } from "@/components/ui/badge";

export type OrderStatus = "open" | "in_progress" | "completed" | "cancelled";

const statusCopy: Record<OrderStatus, { label: string; variant: "success" | "warning" | "destructive" | "secondary" | "muted" }>
  = {
    open: { label: "Offen", variant: "warning" },
    in_progress: { label: "In Arbeit", variant: "secondary" },
    completed: { label: "Abgeschlossen", variant: "success" },
    cancelled: { label: "Storniert", variant: "destructive" },
  };

export function StatusBadge({ status }: { status: OrderStatus }) {
  const data = statusCopy[status] ?? statusCopy.open;
  return (
    <Badge variant={data.variant} className="capitalize">
      {data.label}
    </Badge>
  );
}
