"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { OrderPayload, getOrderById, createOrder, updateOrder } from "@/lib/api/orders";
import { cn, formatDisplayDate } from "@/lib/utils";
import { useAccessToken } from "@/lib/use-access-token";
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

function calcDiffDays(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function OrderForm({ mode, orderId, initialDate }: OrderFormProps) {
  const token = useAccessToken();
  const router = useRouter();
  const [showPositionDialog, setShowPositionDialog] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusVariant, setStatusVariant] = useState<"success" | "warning" | "error">("success");
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer_name: "",
      date: initialDate ?? new Date(),
      positions: []
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = form;

  const { fields, append, remove, update } = useFieldArray({ name: "positions", control });

  const { isLoading: isLoadingOrder } = useSWR(
    mode === "edit" && orderId && token ? ["order", orderId, token] : null,
    ([, id, accessToken]) => getOrderById(accessToken, id),
    {
      onSuccess: (data) => {
        reset({
          customer_name: data.customer_name,
          date: new Date(data.date),
          positions: data.positions
        });
      }
    }
  );

  const positions = useMemo(() => fields.map((field) => ({ ...field, number: Number(field.number) })), [fields]);

  const existingNames = useMemo(() => positions.map((position) => position.name), [positions]);

  const dialogExcludeNames = useMemo(() => {
    if (dialogMode === "edit" && editingIndex !== null) {
      return existingNames.filter((_, index) => index !== editingIndex);
    }
    return existingNames;
  }, [dialogMode, editingIndex, existingNames]);

  const handleAddPosition = (item: { id?: string; name: string; number: number }) => {
    append({ name: item.name, number: item.number, id: item.id });
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
      const current = watch("positions")[editingIndex];
      update(editingIndex, { ...current, ...item });
    } else {
      handleAddPosition(item);
    }
  };

  const handleDialogClose = () => {
    setShowPositionDialog(false);
    setDialogMode("add");
    setEditingIndex(null);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!token) {
      setStatusMessage("Kein Zugriffstoken vorhanden. Bitte erneut anmelden.");
      setStatusVariant("error");
      return;
    }

    setStatusMessage(null);
    const payload: OrderPayload = {
      customer_name: values.customer_name,
      date: values.date.toISOString(),
      positions: values.positions.map(({ name, number }) => ({ name, number }))
    };

    try {
      if (mode === "edit" && orderId) {
        await updateOrder(token, orderId, payload);
        setStatusVariant("success");
        setStatusMessage("Bestellung wurde erfolgreich bearbeitet.");
      } else {
        await createOrder(token, payload);
        setStatusVariant("success");
        setStatusMessage("Bestellung wurde erfolgreich erstellt.");
      }
      mutate(`/api/orders/current/${calcDiffDays(values.date)}`);
      router.back();
    } catch (error) {
      console.error(error);
      setStatusVariant(mode === "edit" ? "warning" : "error");
      setStatusMessage(
        mode === "edit" ? "Bestellung konnte nicht bearbeitet werden." : "Bestellung konnte nicht erstellt werden."
      );
    }
  });

  const handleAbort = () => {
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <Card className="mt-6">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-3xl font-light tracking-wide">
                {mode === "edit" ? "Bestellung bearbeiten" : "Bestellung hinzufügen"}
              </CardTitle>
              {mode === "edit" ? (
                <p className="text-sm text-muted-foreground">
                  Zuletzt geladen am {formatDisplayDate(watch("date"))}
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
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="general" className="flex-1 sm:flex-initial">
                  Allgemein
                </TabsTrigger>
                <TabsTrigger value="positions" className="flex-1 sm:flex-initial">
                  Positionen
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={control}
                    name="customer_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kunde</FormLabel>
                        <CustomerAutocomplete
                          token={token}
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                        <FormMessage>{errors.customer_name?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieferdatum</FormLabel>
                        <FormControl>
                          <OrderDatePicker
                            value={field.value}
                            onChange={(date) => field.onChange(date ?? new Date())}
                          />
                        </FormControl>
                        <FormMessage>{errors.date?.message as string}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="positions">
                <PositionsTable
                  positions={positions}
                  onRemove={remove}
                  onAdd={handleAddPosition}
                  onOpenDialog={handleOpenDialog}
                  onEdit={handleEditPosition}
                  token={token}
                />
                <FormMessage>{errors.positions?.message as string}</FormMessage>
              </TabsContent>
            </Tabs>
            <Separator />
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-muted-foreground">
                {watch("positions").length} Position(en) ausgewählt
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
      </form>
      <PositionDialog
        open={showPositionDialog}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        token={token}
        mode={dialogMode}
        initialPosition={editingIndex !== null ? positions[editingIndex] : null}
        excludeNames={dialogExcludeNames}
      />
    </Form>
  );
}
