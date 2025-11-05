export type Customer = {
  id: string;
  name: string;
};

async function request<T>(token: string | null | undefined): Promise<T> {
  const response = await fetch(`/api/customers/all`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Kunden konnten nicht geladen werden (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function listCustomers(token: string | null | undefined) {
  return request<Customer[]>(token);
}
