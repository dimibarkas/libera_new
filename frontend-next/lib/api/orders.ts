export type OrderPosition = {
  number: number;
  name: string;
};

export type OrderPayload = {
  customer_name: string;
  date: string;
  positions: OrderPosition[];
};

export type OrderResponse = {
  id: string;
  customer_name: string;
  date: string;
  positions: OrderPosition[];
};

const mockOrders: OrderResponse[] = [
  {
    id: "order-1001",
    customer_name: "Musterfirma Schmidt GmbH",
    date: new Date().toISOString(),
    positions: [
      { name: "Premium Kaffeebohnen", number: 4 },
      { name: "Schreibtischlampe Lumen", number: 2 }
    ]
  },
  {
    id: "order-1002",
    customer_name: "Agentur Klartext",
    date: new Date(Date.now() + 86400000 * 3).toISOString(),
    positions: [
      { name: "Notizbuch A5 Classic", number: 12 },
      { name: "USB-C Dockingstation", number: 1 }
    ]
  }
];

export async function getOrderById(id: string): Promise<OrderResponse> {
  const order = mockOrders.find((entry) => entry.id === id);
  if (!order) {
    throw new Error("Bestellung wurde nicht gefunden.");
  }
  return order;
}

export async function createOrder(payload: OrderPayload) {
  const order: OrderResponse = { id: `order-${Date.now()}`, ...payload };
  mockOrders.push(order);
  return order;
}

export async function updateOrder(id: string, payload: OrderPayload) {
  const index = mockOrders.findIndex((entry) => entry.id === id);
  const updated: OrderResponse = { id, ...payload };
  if (index === -1) {
    mockOrders.push(updated);
  } else {
    mockOrders[index] = updated;
  }
  return updated;
}
