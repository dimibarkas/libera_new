"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { OrderPayload, getOrderById, createOrder, updateOrder } from "@/lib/api/orders";
import { cn, formatDisplayDate } from "@/lib/utils";
import { CustomerAutocomplete } from "./customer-autocomplete";
import { OrderDatePicker } from "./order-date-picker";
import { PositionDialog } from "./position-dialog";
import { PositionsTable } from "./positions-table";

const positionSchema = z.object({
  name: z.string().min(1, "Artikel auswählen"),
  number: z
    .number({ invalid_type_error: "Menge muss eine Zahl sein" })
    .int("Ganzzahl erforderlich")
    .min(1, "Mindestmenge 1"),
  id: z.string().optional()
});

const orderSchema = z.object({
  customer_name: z.string().min(3, "Name des Kunden muss länger als drei Zeichen sein."),
  date: z.date({ required_error: "Lieferdatum auswählen" }),
  positions: z.array(positionSchema).min(1, "Mindestens eine Position hinzufügen")
});

export type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderFormProps {
  mode: "create" | "edit";
  orderId?: string;
  initialDate?: Date;
}

export function OrderForm({ mode, orderId, initialDate }: OrderFormProps) {
  const router = useRouter();
  const [showPositionDialog, setShowPositionDialog] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusVariant, setStatusVariant] = useState<"success" | "warning" | "error">("success");
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(mode === "edit");

  const form = useForm<OrderFormValues>({
    defaultValues: {
      customer_name: "",
      date: initialDate ?? new Date(),
      positions: []
    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: orderSchema
    },
    onSubmit: async ({ value }) => {
      setStatusMessage(null);
      const payload: OrderPayload = {
        customer_name: value.customer_name,
        date: value.date.toISOString(),
        positions: value.positions.map(({ name, number }) => ({ name, number }))
      };

      try {
        if (mode === "edit" && orderId) {
          await updateOrder(orderId, payload);
          setStatusVariant("success");
          setStatusMessage("Bestellung wurde erfolgreich bearbeitet.");
        } else {
          await createOrder(payload);
          setStatusVariant("success");
          setStatusMessage("Bestellung wurde erfolgreich erstellt.");
        }
        router.back();
      } catch (error) {
        console.error(error);
        setStatusVariant(mode === "edit" ? "warning" : "error");
        setStatusMessage(
          mode === "edit"
            ? "Bestellung konnte nicht bearbeitet werden."
            : "Bestellung konnte nicht erstellt werden."
        );
      }
    }
  });

  const formValues = form.useStore((state) => state.values);
  const isSubmitting = form.useStore((state) => state.isSubmitting);

  useEffect(() => {
    if (mode === "edit" && orderId) {
      setIsLoadingOrder(true);
      getOrderById(orderId)
        .then((data) => {
          form.setFieldValue("customer_name", data.customer_name);
          form.setFieldValue("date", new Date(data.date));
          form.setFieldValue("positions", data.positions);
        })
        .catch((error) => {
          console.error(error);
          setStatusVariant("error");
          setStatusMessage("Bestellung konnte nicht geladen werden.");
        })
        .finally(() => setIsLoadingOrder(false));
    } else {
      setIsLoadingOrder(false);
    }
  }, [form, mode, orderId]);

  const positions = useMemo(
    () => formValues.positions.map((position) => ({ ...position, number: Number(position.number) })),
    [formValues.positions]
  );

  const existingNames = useMemo(() => positions.map((position) => position.name), [positions]);

  const dialogExcludeNames = useMemo(() => {
    if (dialogMode === "edit" && editingIndex !== null) {
      return existingNames.filter((_, index) => index !== editingIndex);
    }
    return existingNames;
  }, [dialogMode, editingIndex, existingNames]);

  const handleAddPosition = (item: { id?: string; name: string; number: number }) => {
    form.setFieldValue("positions", [...positions, { name: item.name, number: item.number, id: item.id }]);
  };

  const handleOpenDialog = () => {
    setDialogMode("add");
    setEditingIndex(null);
    setShowPositionDialog(true);
  };

  const handleEditPosition = (index: number) => {
    setDialogMode("edit");
    setEditingIndex(index);
    setShowPositionDialog(true);
  };

  const handleDialogSubmit = (item: { id?: string; name: string; number: number }) => {
    if (dialogMode === "edit" && editingIndex !== null) {
      const updated = positions.map((position, idx) =>
        idx === editingIndex ? { ...position, ...item } : position
      );
      form.setFieldValue("positions", updated);
    } else {
      handleAddPosition(item);
    }
  };

  const handleDialogClose = () => {
    setShowPositionDialog(false);
    setDialogMode("add");
    setEditingIndex(null);
  };

  const handleRemovePosition = (index: number) => {
    form.setFieldValue(
      "positions",
      positions.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const handleAbort = () => {
    router.back();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-6"
    >
      <Card className="mt-6">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-3xl font-light tracking-wide">
              {mode === "edit" ? "Bestellung bearbeiten" : "Bestellung hinzufügen"}
            </CardTitle>
            {mode === "edit" ? (
              <p className="text-sm text-muted-foreground">
                Zuletzt geladen am {formatDisplayDate(formValues.date)}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="submit" disabled={isSubmitting || isLoadingOrder}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Speichern
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bestellung sichern</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="outline" onClick={handleAbort}>
                    <X className="mr-2 h-4 w-4" /> Abbrechen
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zurück zur Übersicht</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {statusMessage ? (
            <div
              className={cn(
                "rounded-md border p-4 text-sm",
                statusVariant === "success" && "border-green-600 text-green-700",
                statusVariant === "warning" && "border-yellow-500 text-yellow-600",
                statusVariant === "error" && "border-destructive text-destructive"
              )}
            >
              {statusMessage}
            </div>
          ) : null}
          <div className="grid gap-6 md:grid-cols-2">
            <form.Field
              name="customer_name"
              children={(field) => (
                <FormItem>
                  <FormLabel>Kunde</FormLabel>
                  <CustomerAutocomplete
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                  />
                  <FormMessage>{field.state.meta.errors?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <form.Field
              name="date"
              children={(field) => (
                <FormItem>
                  <FormLabel>Lieferdatum</FormLabel>
                  <FormControl>
                    <OrderDatePicker
                      value={field.state.value}
                      onChange={(date) => field.handleChange(date ?? new Date())}
                    />
                  </FormControl>
                  <FormMessage>{field.state.meta.errors?.[0] as string}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <form.Field
            name="positions"
            children={(field) => (
              <div className="space-y-4">
                <PositionsTable
                  positions={positions}
                  onRemove={handleRemovePosition}
                  onAdd={handleAddPosition}
                  onOpenDialog={handleOpenDialog}
                  onEdit={handleEditPosition}
                />
                <FormMessage>{field.state.meta.errors?.[0]}</FormMessage>
              </div>
            )}
          />
          <Separator />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-muted-foreground">
              {positions.length} Position(en) ausgewählt
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting || isLoadingOrder}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Speichern
              </Button>
              <Button type="button" variant="outline" onClick={handleAbort}>
                <X className="mr-2 h-4 w-4" /> Abbrechen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <PositionDialog
        open={showPositionDialog}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        mode={dialogMode}
        initialPosition={editingIndex !== null ? positions[editingIndex] : null}
        excludeNames={dialogExcludeNames}
      />
    </form>
  );
}
