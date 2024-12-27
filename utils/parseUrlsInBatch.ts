import { crawlSingleUrl } from "./crawlSingleUrl.ts";
import {options} from "./headers.ts"

export async function processUrlsInBatch(urls: string[], sitemap: object[], visited: Set<string>, batchSize: number, maximumUrls: number) {
    const promises = [];
    let count = visited.size; // Track visited URLs count

    // Limit the number of URLs we crawl based on `maximumUrls`
    for (let i = 0; i < Math.min(batchSize, urls.length); i++) {
        const url = urls[i];
        if (!visited.has(url) && count < maximumUrls) {
            promises.push(crawlSingleUrl(url, sitemap, visited, maximumUrls,options));
            count++;
        }
    }
    await Promise.all(promises);
}