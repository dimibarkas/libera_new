export type Customer = {
  id: string;
  name: string;
};

const mockCustomers: Customer[] = [
  { id: "mock-customer-1", name: "Musterfirma Schmidt GmbH" },
  { id: "mock-customer-2", name: "Bäckerei Huber" },
  { id: "mock-customer-3", name: "Agentur Klartext" },
  { id: "mock-customer-4", name: "Logistik Meyer AG" },
  { id: "mock-customer-5", name: "Privatkunde Anna Weber" }
];

const withMocks = (customers: Customer[] = []) => {
  const map = new Map(customers.map((customer) => [customer.id, customer] as const));
  for (const mock of mockCustomers) {
    if (!map.has(mock.id)) {
      map.set(mock.id, mock);
    }
  }
  return Array.from(map.values());
};

async function request(token: string | null | undefined) {
  try {
    const response = await fetch(`/api/customers/all`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store"
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Kunden konnten nicht geladen werden (${response.status})`);
    }

    const data = (await response.json()) as Customer[];

    if (!Array.isArray(data) || data.length === 0) {
      return mockCustomers;
    }

    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Falle auf Mock-Kunden zurück:", error);
    }
    return mockCustomers;
  }
}

export async function listCustomers(token: string | null | undefined) {
  const customers = await request(token);
  return withMocks(customers);
}
