// import { serve } from "https://deno.land/std@0.122.0/http/server.ts";

// serve(handler, {hostname: "192.168.29.53", port: 80});

// async function handler(req: Request): Promise<Response> {
//   console.log("Method:", req.method);

//   const url = new URL(req.url);
//   console.log("Path:", url.pathname);
//   console.log("Query parameters:", url.searchParams);

//   console.log("Headers:", req.headers);

//   if (req.body) {
//     const body = await req.text();
//     console.log("Body:", body);
//   }

//   return new Response("Hello, World!");
// }




import * as path from "https://deno.land/std@0.122.0/path/mod.ts";
import { readableStreamFromReader } from "https://deno.land/std@0.122.0/streams/mod.ts";

// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 80, hostname: "192.168.29.53" });

for await (const conn of server) {
  handleHttp(conn);
}

async function handleHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    // Use the request pathname as filepath
    const url = new URL(requestEvent.request.url);
    const filepath = decodeURIComponent(url.pathname);

    // Try opening the file
    let file;
    try {
      file = await Deno.open("." + filepath, { read: true });
      const stat = await file.stat();

      // If File instance is a directory, lookup for an index.html
      if (stat.isDirectory) {
        file.close();
        const filePath = path.join("./", filepath, "index.html");
        file = await Deno.open(filePath, { read: true });
      }
    } catch {
      // If the file cannot be opened, return a "404 Not Found" response
      const notFoundResponse = new Response("yo 404", { status: 404 });
      await requestEvent.respondWith(notFoundResponse);
      return;
    }

    // Build a readable stream so the file doesn't have to be fully loaded into
    // memory while we send it
    const readableStream = readableStreamFromReader(file);

    // Build and send the response
    const response = new Response(readableStream);
    await requestEvent.respondWith(response);
  }
}