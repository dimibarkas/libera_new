"use client";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { listArticles } from "@/lib/api/articles";

interface ArticleAutocompleteProps {
  token: string | null;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onTabToNext?: () => void;
}

export function ArticleAutocomplete({ token, value, onChange, placeholder = "Artikel auswählen", onTabToNext }: ArticleAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: articles, isLoading } = useSWR(open ? ["articles", token] : null, ([, accessToken]) => listArticles(accessToken), {
    keepPreviousData: true
  });

  const filtered = articles?.filter((article) =>
    article.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className={cn("w-full justify-between", !value && "text-muted-foreground")}
          onClick={() => setOpen((prev) => !prev)}
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Suche Artikel..."
            onKeyDown={(event) => {
              if (event.key === "Tab" && !event.shiftKey && onTabToNext) {
                event.preventDefault();
                setOpen(false);
                requestAnimationFrame(() => onTabToNext());
              }
            }}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Wird geladen ...
              </div>
            ) : (
              <>
                <CommandEmpty>Kein Artikel gefunden.</CommandEmpty>
                <CommandGroup>
                  {filtered?.map((article) => (
                    <CommandItem
                      key={article.id}
                      value={article.name}
                      onSelect={(currentValue) => {
                        onChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === article.name ? "opacity-100" : "opacity-0")} />
                      {article.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
