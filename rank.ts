import sitemap from "./sitemap.json" with { type: "json" }
import { remove_stopwords } from "./utils/removeStopWords.ts";
import { rankSentencesByQuery } from "./utils/tf-idf.ts";


export function rank_pages(query:string){
    return rankSentencesByQuery(sitemap,remove_stopwords(query))

}
