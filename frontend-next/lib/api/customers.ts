export type Customer = {
  id: string;
  name: string;
};

export const mockCustomers: Customer[] = [
  { id: "mock-customer-1", name: "Musterfirma Schmidt GmbH" },
  { id: "mock-customer-2", name: "Bäckerei Huber" },
  { id: "mock-customer-3", name: "Agentur Klartext" },
  { id: "mock-customer-4", name: "Logistik Meyer AG" },
  { id: "mock-customer-5", name: "Privatkunde Anna Weber" }
];

export async function listCustomers() {
  return mockCustomers;
}
