'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, ChevronLeft, ChevronRight, Filter, RotateCw, ShoppingBag, Table } from "lucide-react";
import { format } from "date-fns";

export type FilterControlsProps = {
  search: string;
  status: string;
  sort: string;
  date: Date;
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onAdd: () => void;
  onDateChange: (value: Date) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onRefresh: () => void;
  onShowBuyList?: () => void;
  onShowDeliveryNotes?: () => void;
};

export function FilterControls({
  search,
  status,
  sort,
  date,
  onSearch,
  onStatusChange,
  onSortChange,
  onAdd,
  onDateChange,
  onPrevDay,
  onNextDay,
  onRefresh,
  onShowBuyList,
  onShowDeliveryNotes,
}: FilterControlsProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button onClick={onAdd} className="order-2 sm:order-none">Hinzufügen</Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onPrevDay} aria-label="Vorheriger Tag" className="hidden sm:inline-flex">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNextDay} aria-label="Nächster Tag" className="hidden sm:inline-flex">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => onDateChange(new Date())}>
            <Calendar className="h-4 w-4" />
            {format(date, "dd.MM.yyyy")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Suche nach Kunden oder ID"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full"
          />
          <Button variant="outline" size="icon" onClick={onRefresh} aria-label="Neu laden">
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger aria-label="Status filtern">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Alle Stati</SelectItem>
            <SelectItem value="open">Offen</SelectItem>
            <SelectItem value="in_progress">In Arbeit</SelectItem>
            <SelectItem value="completed">Abgeschlossen</SelectItem>
            <SelectItem value="cancelled">Storniert</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger aria-label="Sortierung">
            <SelectValue placeholder="Sortierung" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Datum absteigend</SelectItem>
            <SelectItem value="date-asc">Datum aufsteigend</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Weitere Aktionen
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[12rem]">
            {onShowBuyList && (
              <DropdownMenuItem onSelect={onShowBuyList} className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                Einkaufsliste
              </DropdownMenuItem>
            )}
            {onShowDeliveryNotes && (
              <DropdownMenuItem onSelect={onShowDeliveryNotes} className="gap-2">
                <Table className="h-4 w-4" />
                Lieferscheine
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
