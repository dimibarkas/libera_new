'use client';

import { useMemo, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { formatISO, addDays, subDays } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrdersTable } from "./components/orders-table";
import { FilterControls } from "./components/filter-controls";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Fehler beim Laden der Bestellungen");
  }
  return res.json();
};

function buildQuery(baseDate: Date, page: number, pageSize: number, search: string, status: string, sort: string) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());
  params.set("date", formatISO(baseDate, { representation: "date" }));
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (sort) params.set("sort", sort);
  return `/api/orders?${params.toString()}`;
}

type OrderResponse = {
  orders: { _id: string; customer_name: string; status?: any; date?: string; total?: number }[];
  total: number;
  page: number;
  pageSize: number;
};

export default function OrdersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  });
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const queryKey = useMemo(
    () => buildQuery(selectedDate, page, pageSize, search, status, sort),
    [page, pageSize, search, selectedDate, sort, status]
  );

  const { data, isLoading, error, mutate } = useSWR<OrderResponse>(queryKey, fetcher, {
    keepPreviousData: true,
  });

  const rows = data?.orders ?? [];
  const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;

  const handleDelete = async () => {
    if (!pendingDelete) return;
    await fetch(`/api/orders/id/${pendingDelete}`, { method: "DELETE" });
    setPendingDelete(null);
    mutate();
  };

  return (
    <main className="container py-10">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Bestellungen</h1>
        <p className="text-sm text-muted-foreground">Suche, filtere und verwalte alle Bestellungen.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-xl font-semibold">Übersicht</CardTitle>
          <CardDescription>Filter, Suche und Aktionen für Bestellungen</CardDescription>
          <FilterControls
            search={search}
            status={status}
            sort={sort}
            date={selectedDate}
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onStatusChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            onSortChange={(value) => setSort(value)}
            onAdd={() => router.push("/orders/new")}
            onDateChange={(value) => {
              const next = new Date(value);
              next.setHours(12, 0, 0, 0);
              setSelectedDate(next);
              setPage(1);
            }}
            onPrevDay={() => {
              const next = subDays(selectedDate, 1);
              next.setHours(12, 0, 0, 0);
              setSelectedDate(next);
            }}
            onNextDay={() => {
              const next = addDays(selectedDate, 1);
              next.setHours(12, 0, 0, 0);
              setSelectedDate(next);
            }}
            onRefresh={() => mutate()}
            onShowBuyList={() => router.push("/orders/buylist")}
            onShowDeliveryNotes={() => router.push("/orders/deliverynotes")}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Badge variant="destructive" className="px-3 py-2 text-sm">
              Beim Laden ist ein Fehler aufgetreten.
            </Badge>
          )}
          {isLoading && (
            <div className="flex items-center justify-center py-10 text-muted-foreground">Daten werden geladen …</div>
          )}
          <OrdersTable
            rows={rows}
            onView={(id) => router.push(`/orders/${id}`)}
            onEdit={(id) => router.push(`/orders/${id}/edit`)}
            onDelete={(id) => setPendingDelete(id)}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Seite {page} von {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Zurück
              </Button>
              <Input
                value={page}
                onChange={(e) => {
                  const next = Number(e.target.value) || 1;
                  setPage(Math.min(Math.max(1, next), totalPages));
                }}
                className="h-9 w-16 text-center"
              />
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              >
                Weiter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bestellung löschen?</DialogTitle>
            <DialogDescription>
              Dieser Schritt kann nicht rückgängig gemacht werden. Soll die Bestellung wirklich gelöscht werden?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingDelete(null)}>
              Abbrechen
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
