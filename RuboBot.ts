import { processUrlsInBatch } from "./utils/parseUrlsInBatch.ts";

function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '');
}


export async function crawl(urls: string[], sitemap: object[], batchSize: number = 10, maximumUrls: number) {
    const visited = new Set<string>(); 
    const stack = [...urls]; 

    // If the number of URLs is greater than the maximum, return the sitemap 
    if (urls.length > maximumUrls) {
        console.log('The list of URLs is greater than the maximum. Returning sitemap...');
        return sitemap;
    }

    // Process URLs in batches concurrently
    while (stack.length > 0 && visited.size < maximumUrls) {
        const urlBatch = stack.splice(0, batchSize);
        // Use Promise.all to process the URLs concurrently
        await Promise.all(urlBatch.map(url => processUrlsInBatch([url], sitemap, visited, batchSize, maximumUrls)));
    }

    console.log(`Finished crawling. Visited ${visited.size} URLs.\n`);
    return sitemap;
}

export async function ruboBot(urls: string[], maximum_urls: number) {
    const fileContent: any = [];
    const _sitemap = fileContent;

 
    const sitemap = await crawl(urls, _sitemap, 10, Math.floor(maximum_urls)); 

    // Save the sitemap as a JSON file
    await Deno.writeTextFile("sitemap.json", JSON.stringify(sitemap, null, 2));
}


await ruboBot([
    'https://en.wikipedia.org/wiki/Google',
    'https://en.wikipedia.org/wiki/Main_Page',
    'https://en.wiktionary.org/wiki/Wiktionary:Main_Page',
    "https://arxiv.org",
    "https://www.britannica.com/History-Society",
    'https://www.britannica.com/Animals-Nature',
    "https://www.bbc.com/news",
    "https://www.nytimes.com",
    "https://www.reuters.com",
    "https://www.amazon.com",
    "https://www.govtrack.us",
    "https://www.harvard.edu/a-to-z/",
    "https://www.stackoverflow.com",
    "https://www.github.com",
    "https://www.reddit.com",
    "https://www.imdb.com"
], 600);
