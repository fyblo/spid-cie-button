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

        const { renderDialog, renderButton, renderHead } =
          await vite.ssrLoadModule("/src/entry-server.ts");
        const rpEndpoint = (idp) =>
          `https://example.com/proxy.php?client_id=SOME_CLIENT_ID&action=login&redirect_uri=SOME_REDIRECT_URI&idp=${idp}&state=SOME_STATE`;
        const lang = "it";
        const appDialog = await renderDialog({
          lang,
          rpEndpoint,
          targetSelf: true,
          withDemo: true,
        });
        const appButton = await renderButton({ lang, type: "spid" });
        const appHeadHtml = await renderHead();

        const html = transformedTemplate.replace(
          "<!--spid-cie-button-ssr-outlet-->",
          appDialog + appButton,
        );

        const finalHtml = html.replace(
          "<!--spid-cie-button-ssr-head-outlet-->",
          appHeadHtml,
        );

        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(finalHtml);
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
