'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";

export type ActionHandlers = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function ActionMenu({ onView, onEdit, onDelete }: ActionHandlers) {
  const actions = useMemo(
    () => [
      { label: "Anzeigen", icon: Eye, handler: onView },
      { label: "Bearbeiten", icon: Pencil, handler: onEdit },
      { label: "Löschen", icon: Trash2, handler: onDelete, tone: "destructive" as const },
    ].filter((action) => Boolean(action.handler)),
    [onDelete, onEdit, onView]
  );

  return (
    <div className="flex items-center justify-end gap-2">
      <TooltipProvider>
        {actions.map((action, idx) => {
          if (idx < 2) {
            const Icon = action.icon;
            return (
              <Tooltip key={action.label}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant={action.tone === "destructive" ? "destructive" : "ghost"}
                    onClick={action.handler}
                    aria-label={action.label}
                    className="hidden sm:inline-flex"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{action.label}</TooltipContent>
              </Tooltip>
            );
          }
          return null;
        })}
      </TooltipProvider>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <DropdownMenuItem key={action.label} onSelect={action.handler} className="space-x-2">
                <Icon className="h-4 w-4" />
                <span>{action.label}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
