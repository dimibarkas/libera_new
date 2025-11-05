"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArticleAutocomplete } from "./article-autocomplete";

interface AddPositionInlineProps {
  token: string | null;
  onAdd: (item: { name: string; number: number }) => void;
}

export function AddPositionInline({ token, onAdd }: AddPositionInlineProps) {
  const [article, setArticle] = useState("");
  const [amount, setAmount] = useState<number>(1);

  const disabled = !article || amount <= 0;

  const handleSubmit = () => {
    if (disabled) return;
    onAdd({ name: article, number: amount });
    setArticle("");
    setAmount(1);
  };

  return (
    <TableRow className="hidden md:table-row">
      <TableCell>
        <ArticleAutocomplete token={token} value={article} onChange={setArticle} />
      </TableCell>
      <TableCell className="w-32 text-center">
        <Input
          type="number"
          min={1}
          value={amount}
          onChange={(event) => {
            const next = Number(event.target.value);
            setAmount(Number.isNaN(next) ? 1 : next);
          }}
          className="text-center"
        />
      </TableCell>
      <TableCell className="w-32 text-center">
        <Button type="button" size="sm" onClick={handleSubmit} disabled={disabled}>
          Hinzufügen
        </Button>
      </TableCell>
    </TableRow>
  );
}
