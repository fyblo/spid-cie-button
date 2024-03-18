import { createServer as createViteServer } from "vite";
import { createServer } from "node:http";
import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 3000;
const host = "localhost";

async function createRequestListener() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  return async (req, res) => {
    try {
      const parsedUrl = new URL(req.url, `http://${host}:${port}`);
      let serveUrl = parsedUrl.pathname;

      if (vite.middlewares) {
        try {
          await new Promise((resolve) => vite.middlewares(req, res, resolve));
        } catch (err) {
          console.error(err);
        }
      }

      if (req.method === "GET" && serveUrl.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }

      if (serveUrl === "/") {
        serveUrl = "/index.html";
      }

      console.log("Serving URL", serveUrl);

      if (serveUrl.endsWith(".html")) {
        const template = fs.readFileSync(
          path.resolve(__dirname, "./index.html"),
          "utf-8",
        );

        const transformedTemplate = await vite.transformIndexHtml(
          serveUrl,
          template,
        );

        const { render } = await vite.ssrLoadModule("/src/entry-server.ts");
        const { appHtml } = await render();

        const html = transformedTemplate.replace("<!--ssr-outlet-->", appHtml);

        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(html);
      } else {
        res.end();
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end(err.message);
    }
  };
}

createRequestListener().then((requestListener) => {
  const server = createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
});
