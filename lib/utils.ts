export async function proxyFetch(url: string) {
    const targetUrl = encodeURIComponent(`https://content.section-l.co/${url}`);
    const response = await fetch(`/api/proxy?url=${targetUrl}`);
    return response;
}