import { isCrawlable } from "./isCrawlable.ts";
import {delay} from "./delay.ts"
import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { normalizeUrl } from "./normalizeUrl.ts";
import { isHtmlLink } from "./isHtmlLink.ts";
import { processUrlsInBatch } from "./parseUrlsInBatch.ts";

function removeHtmlTags(input:string) {
    return input.replace(/<[^>]*>/g, '');
}
 export async function crawlSingleUrl(url: string, sitemap: object[], visited: Set<string>, maximumUrls: number,options:object) {
    try {
        visited.add(url); 
        if (await isCrawlable(url, options)) {
            await delay(1000); // Avoid hammering the server
            const request = await fetch(url, options);
            const html = await request.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');

            // Extract title, description, and text content
            const title = doc.head.getElementsByTagName("title")[0]?.textContent || 'No title found';
            const metaDescription = doc.head.querySelector('meta[name="description"]')?.getAttribute('content') || 'No description found';
            const allText = removeHtmlTags(doc.body.textContent) || 'No content found';
                                                     // not triming to avoid words being stuck togehter making ranking the pages impossible


           
            sitemap.push({ location: url, title, description: metaDescription, text: allText });
            console.log(`%c${url}:: has been added to the sitemap \n`,'color: green');

           
            const links = Array.from(doc.querySelectorAll('a[href]')).map(a => a.getAttribute('href')!).filter(href => {
                const fullUrl = normalizeUrl(url, href);
                return !fullUrl.includes('#') && isHtmlLink(fullUrl) && !visited.has(fullUrl);
            });

           
            await processUrlsInBatch(links, sitemap, visited, 5, maximumUrls);
        } else {
            console.log(`%c${url} ::  Access has been denied \n`,'color: red');
        }
    } catch (err) {
        console.log(`%c${url} responded with an error: ${err} \n`,'color: red');
    }
}