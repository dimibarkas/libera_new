export type Article = {
  id: string;
  name: string;
};

export const mockArticles: Article[] = [
  { id: "mock-article-1", name: "Premium Kaffeebohnen" },
  { id: "mock-article-2", name: "Schreibtischlampe Lumen" },
  { id: "mock-article-3", name: "Bürostuhl ErgoFlex" },
  { id: "mock-article-4", name: "Notizbuch A5 Classic" },
  { id: "mock-article-5", name: "USB-C Dockingstation" }
];

export async function listArticles() {
  return mockArticles;
}
