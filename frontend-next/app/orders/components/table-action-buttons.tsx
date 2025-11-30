"use client";

import { Edit, MoreVertical, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TableActionButtonsProps {
  onDelete: () => void;
  onEdit?: () => void;
}

export function TableActionButtons({ onDelete, onEdit }: TableActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <TooltipProvider>
        <div className={cn("hidden items-center gap-2 sm:flex")}>
          {onEdit ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onEdit} aria-label="Bearbeiten">
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bearbeiten</TooltipContent>
            </Tooltip>
          ) : null}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onDelete} aria-label="Löschen">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Löschen</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div className="flex sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Aktionen">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {onEdit ? <DropdownMenuItem onSelect={onEdit}>Bearbeiten</DropdownMenuItem> : null}
            <DropdownMenuItem onSelect={onDelete} className="text-destructive focus:text-destructive">
              Löschen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
