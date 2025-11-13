export async function proxyFetch(url: string) {
    const targetUrl = encodeURIComponent(`https://content.section-l.co/${url}`);
    const response = await fetch(`/api/proxy?url=${targetUrl}`);
    return response;
}

export const createFetchFunction = <T>(endpoint: string): (() => Promise<T[]>) => {
  return async (): Promise<T[]> => {
    const response = await proxyFetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint.split('?')[0]}`);
    }
    const data = await response.json();
    return data.data || [];
  };
};