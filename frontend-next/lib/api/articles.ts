export type Article = {
  id: string;
  name: string;
};

const mockArticles: Article[] = [
  { id: "mock-article-1", name: "Premium Kaffeebohnen" },
  { id: "mock-article-2", name: "Schreibtischlampe Lumen" },
  { id: "mock-article-3", name: "Bürostuhl ErgoFlex" },
  { id: "mock-article-4", name: "Notizbuch A5 Classic" },
  { id: "mock-article-5", name: "USB-C Dockingstation" }
];

const withMocks = (articles: Article[] = []) => {
  const map = new Map(articles.map((article) => [article.id, article] as const));
  for (const mock of mockArticles) {
    if (!map.has(mock.id)) {
      map.set(mock.id, mock);
    }
  }
  return Array.from(map.values());
};

async function request(token: string | null | undefined) {
  try {
    const response = await fetch(`/api/articles/all`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store"
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Artikel konnten nicht geladen werden (${response.status})`);
    }

    const data = (await response.json()) as Article[];

    if (!Array.isArray(data) || data.length === 0) {
      return mockArticles;
    }

    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Falle auf Mock-Artikel zurück:", error);
    }
    return mockArticles;
  }
}

export async function listArticles(token: string | null | undefined) {
  const articles = await request(token);
  return withMocks(articles);
}
