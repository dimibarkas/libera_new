"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArticleAutocomplete, ArticleAutocompleteHandle } from "./article-autocomplete";

interface PositionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: { id?: string; name: string; number: number }) => void;
  mode: "add" | "edit";
  initialPosition?: { id?: string; name: string; number: number } | null;
  excludeNames?: string[];
}

const initialState: { id?: string; name: string; number: number } = { id: undefined, name: "", number: 1 };

export function PositionDialog({
  open,
  onClose,
  onSubmit,
  mode,
  initialPosition,
  excludeNames = []
}: PositionDialogProps) {
  const [position, setPosition] = useState(initialState);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const articleRef = useRef<ArticleAutocompleteHandle>(null);

  useEffect(() => {
    if (!open) {
      setPosition(initialState);
      return;
    }

    setPosition(initialPosition ?? initialState);
    requestAnimationFrame(() => {
      if (mode === "add") {
        articleRef.current?.focus();
      } else {
        articleRef.current?.focusTrigger();
      }
    });
  }, [initialPosition, mode, open]);

  const handleSave = () => {
    if (!position.name || position.number <= 0) return;
    onSubmit(position);
    onClose();
    setPosition(initialState);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => (!value ? onClose() : null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Position bearbeiten" : "Position hinzufügen"}</DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Vorhandene Positionsdaten anpassen."
              : "Artikel und Menge auswählen, um sie der Bestellung hinzuzufügen."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <ArticleAutocomplete
            ref={articleRef}
            value={position.name}
            onChange={(name) => setPosition((prev) => ({ ...prev, name }))}
            onTabToNext={() => amountInputRef.current?.focus()}
            excludeNames={excludeNames}
          />
          <Input
            type="number"
            min={1}
            value={position.number}
            ref={amountInputRef}
            onChange={(event) => {
              const next = Number(event.target.value);
              setPosition((prev) => ({ ...prev, number: Number.isNaN(next) ? prev.number : next }));
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSave();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Abbrechen
          </Button>
          <Button type="button" onClick={handleSave} disabled={!position.name || position.number <= 0}>
            <ShoppingCart className="mr-2 h-4 w-4" /> {mode === "edit" ? "Aktualisieren" : "Speichern"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
