"use client";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { listCustomers } from "@/lib/api/customers";

interface CustomerAutocompleteProps {
  token: string | null;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CustomerAutocomplete({ token, value, onChange, placeholder = "Kunde auswählen" }: CustomerAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: customers, isLoading } = useSWR(open ? ["customers", token] : null, ([, accessToken]) => listCustomers(accessToken), {
    keepPreviousData: true
  });

  const filtered = customers?.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
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
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput value={search} onValueChange={setSearch} placeholder="Suche Kunden..." />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Wird geladen ...
              </div>
            ) : (
              <>
                <CommandEmpty>Kein Kunde gefunden.</CommandEmpty>
                <CommandGroup>
                  {filtered?.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      value={customer.name}
                      onSelect={() => {
                        onChange(customer.name);
                        setSearch("");
                        setOpen(false);
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === customer.name ? "opacity-100" : "opacity-0")} />
                      {customer.name}
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
