export function normalizeUrl(baseUrl: string, url: string): string {
    if (url.startsWith('//')) {
        const protocol = baseUrl.startsWith('https') ? 'https:' : 'http:';
        return protocol + url;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    if (url.startsWith('/')) {
        const baseUrlWithoutPath = baseUrl.split('/').slice(0, 3).join('/');  // Extract the protocol + domain
        return baseUrlWithoutPath + url;
    }
    return new URL(url, baseUrl).href;
}