"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArticleAutocomplete } from "./article-autocomplete";

interface PositionDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: { name: string; number: number }) => void;
  token: string | null;
}

const initialState = { name: "", number: 1 };

export function PositionDialog({ open, onClose, onAdd, token }: PositionDialogProps) {
  const [position, setPosition] = useState(initialState);

  useEffect(() => {
    if (!open) {
      setPosition(initialState);
    }
  }, [open]);

  const handleSave = () => {
    if (!position.name || position.number <= 0) return;
    onAdd(position);
    onClose();
    setPosition(initialState);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => (!value ? onClose() : null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Position hinzufügen</DialogTitle>
          <DialogDescription>Artikel und Menge auswählen, um sie der Bestellung hinzuzufügen.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <ArticleAutocomplete token={token} value={position.name} onChange={(name) => setPosition((prev) => ({ ...prev, name }))} />
          <Input
            type="number"
            min={1}
            value={position.number}
            onChange={(event) => {
              const next = Number(event.target.value);
              setPosition((prev) => ({ ...prev, number: Number.isNaN(next) ? prev.number : next }));
            }}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Abbrechen
          </Button>
          <Button type="button" onClick={handleSave} disabled={!position.name || position.number <= 0}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
