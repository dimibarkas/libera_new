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

async function request<T>(url: string, token: string | null | undefined, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request fehlgeschlagen (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return (await response.json()) as T;
}

export async function getOrderById(token: string | null | undefined, id: string): Promise<OrderResponse> {
  return request<OrderResponse>(`/api/orders/id/${id}`, token);
}

export async function createOrder(token: string | null | undefined, payload: OrderPayload) {
  return request<OrderResponse>(`/api/orders`, token, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function updateOrder(token: string | null | undefined, id: string, payload: OrderPayload) {
  return request<OrderResponse>(`/api/orders/id/${id}`, token, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}
