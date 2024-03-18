import { createServer as createViteServer } from "vite";
import { createServer } from "node:http";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
const host = "localhost";

/**
 * Create a request listener for the server.
 * We use Vite as a middleware to serve the files and handle the requests.
 * We use standard Node.js HTTP server to handle the requests.
 * @returns {Promise<import('http').RequestListener>}
 */
const createRequestListener = async () => {
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

      if (serveUrl.endsWith(".html")) {
        const template = readFileSync(
          resolve(__dirname, "./index.html"),
          "utf-8",
        );

        const transformedTemplate = await vite.transformIndexHtml(
          serveUrl,
          template,
        );

        const { render } = await vite.ssrLoadModule("/src/entry-server.ts");
        const { appHtml } = await render();

        const html = transformedTemplate.replace(
          "<!--spid-cie-button-ssr-outlet-->",
          appHtml,
        );

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
};

/**
 * Start the server
 */
createRequestListener().then((requestListener) => {
  const server = createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
});
