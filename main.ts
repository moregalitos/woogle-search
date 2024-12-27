import { rank_pages } from "./rank.ts";
import sitemap from "./sitemap.json" with { type: "json" }

function format_data(data:any){
    const res = []
    for (let link of data){
        const url = sitemap[link.index].location
        const title = sitemap[link.index].title
        const description = sitemap[link.index].description
        res.push({url,title,description})
        
    }
    return res

}


Deno.serve(async (req:any) => {
    const url = new URL(req.url);
    const path = url.pathname;
    const searchParams = url.searchParams
    if(path == '/'){
        const html = await Deno.readTextFile("./client/index.html")
        return new Response(html, {
            headers: {
              "Content-Type": "text/html; charset=UTF-8",
            },
            status: 200,
          });
    } 
    if(path == '/api'){
        const query = searchParams.get("query");
       if(query){
        const response = JSON.stringify(format_data(rank_pages(query)))

        return new Response(response,{status:200})
       } else return new Response(JSON.stringify({
        error:"no query param"
       }),{status:404})
    }
    if(path == '/index.css'){
        const css = await Deno.readTextFile("./client/index.css")
        return new Response(css, {
            headers: {
              "Content-Type": "text/css; charset=UTF-8",
            },
            status: 200,
          });
    }
    if(path.startsWith("/search.html")){
      const css = await Deno.readTextFile("./client/search.html")
      return new Response(css, {
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
          },
          status: 200,
        });

    }
    if (path === '/shitty_logo.png') {
        const image = await Deno.readFile("./client/shitty_logo.png");
        return new Response(image, {
          headers: {
            "Content-Type": "image/png", 
          },
          status: 200,
        });
      }
      
    return new Response("Page not found", { status: 404 });
    
  }, { port: 8000 });
  
  console.log("Server is running on http://localhost:8000");
  
