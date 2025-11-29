"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArticleAutocomplete, ArticleAutocompleteHandle } from "./article-autocomplete";

interface AddPositionInlineProps {
  onAdd: (item: { id?: string; name: string; number: number }) => void;
  excludeNames?: string[];
}

export function AddPositionInline({ onAdd, excludeNames = [] }: AddPositionInlineProps) {
  const [article, setArticle] = useState("");
  const [amount, setAmount] = useState<number>(1);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const articleRef = useRef<ArticleAutocompleteHandle>(null);

  const disabled = !article || amount <= 0;

  const handleSubmit = () => {
    if (disabled) return;
    onAdd({ name: article, number: amount });
    setArticle("");
    setAmount(1);
    requestAnimationFrame(() => {
      articleRef.current?.focus();
    });
  };

  useEffect(() => {
    articleRef.current?.focusTrigger();
  }, []);

  return (
    <TableRow className="hidden md:table-row">
      <TableCell>
        <ArticleAutocomplete
          ref={articleRef}
          value={article}
          onChange={setArticle}
          onTabToNext={() => amountInputRef.current?.focus()}
          excludeNames={excludeNames}
        />
      </TableCell>
      <TableCell className="w-32 text-center">
        <Input
          type="number"
          min={1}
          value={amount}
          ref={amountInputRef}
          onChange={(event) => {
            const next = Number(event.target.value);
            setAmount(Number.isNaN(next) ? 1 : next);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit();
            }
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
