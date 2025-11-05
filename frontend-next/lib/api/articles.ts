export type Article = {
  id: string;
  name: string;
};

async function request<T>(token: string | null | undefined): Promise<T> {
  const response = await fetch(`/api/articles/all`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Artikel konnten nicht geladen werden (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function listArticles(token: string | null | undefined) {
  return request<Article[]>(token);
}
