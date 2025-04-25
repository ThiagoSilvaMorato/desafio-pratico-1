interface ShortUrl {
  fullUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: Date;
}

export function convertToCsv(data: ShortUrl[]): string {
  if (data.length === 0) return "";

  const headers = "URL Completa, URL Encurtada, Total de Acessos, Data de Criação";

  const rows = data.map(
    (obj) => `${obj.fullUrl}, ${obj.shortUrl}, ${obj.accessCount}, ${obj.createdAt.toISOString()}`
  );

  return [headers, ...rows].join("\n");
}
