// import fs from "node:fs/promises";
// import http from "node:http";
import { createServer } from "vite";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const processRequest = async (req, res) => {
//   try {
//     const url = req.url.replace(base, "");
//     console.log(url);

//     let template;
//     let render;
//     if (!isProduction) {
//       // Always read fresh template in development
//       template = await fs.readFile("./index.html", "utf-8");
//       template = await vite.transformIndexHtml(url, template);
//       render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
//     } else {
//       template = templateHtml;
//       render = (await import("./dist/server/entry-server.js")).render;
//     }

//     const rendered = await render(url, ssrManifest);

//     const html = template
//       .replace("<!--app-head-->", rendered.head ?? "")
//       .replace("<!--app-html-->", rendered.html ?? "");

//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/html");
//     res.end(html);
//   } catch (e) {
//     vite?.ssrFixStacktrace(e);
//     console.log(e.stack);
//     res.status(500).end(e.stack);
//   }
// };

// async function createServer() {
const port = process.env.PORT || 3000;
// const base = process.env.BASE || "/";
// const server = http.createServer();
// server.listen(port);
// async (req, res) => {
//   await processRequest(req, res);
// }
// const app = express()

// Create Vite server in middleware mode and configure the app type as
// 'custom', disabling Vite's own HTML serving logic so parent server
// can take control
const vite = await createServer({
  server: { middlewareMode: "ssr" },
  // appType: 'custom'
});
// vite.middlewares.use("index.html", async (req, res, next) => {
//   console.log("Test1");
//   await processRequest(req, res);
//   console.log("Test2");
//   next();
// });
vite.middlewares.use(async (req, res, next) => {
  const url = req.originalUrl;

  console.log("Test1", url);

  try {
    // 1. Read index.html
    let template = fs.readFileSync(
      path.resolve(__dirname, "index.html"),
      "utf-8",
    );

    // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
    //    and also applies HTML transforms from Vite plugins, e.g. global
    //    preambles from @vitejs/plugin-react
    template = await vite.transformIndexHtml(url, template);

    // 3a. Load the server entry. ssrLoadModule automatically transforms
    //    ESM source code to be usable in Node.js! There is no bundling
    //    required, and provides efficient invalidation similar to HMR.
    const { render } = await vite.ssrLoadModule("/src/entry-server.js");

    // 4. render the app HTML. This assumes entry-server.js's exported
    //     `render` function calls appropriate framework SSR APIs,
    //    e.g. ReactDOMServer.renderToString()
    const appHtml = await render(url);

    // 5. Inject the app-rendered HTML into the template.
    const html = template.replace("<!--ssr-outlet-->", appHtml);

    // 6. Send the rendered HTML back.
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    // If an error is caught, let Vite fix the stack trace so it maps back
    // to your actual source code.
    vite.ssrFixStacktrace(e);
    next(e);
  }
});
vite.listen(port);

// Use vite's connect instance as middleware. If you use your own
// express router (express.Router()), you should use router.use
// When the server restarts (for example after the user modifies
// vite.config.js), `vite.middlewares` is still going to be the same
// reference (with a new internal stack of Vite and plugin-injected
// middlewares). The following is valid even after restarts.
// app.use(vite.middlewares)

// app.use('*', async (req, res) => {
//   // serve index.html - we will tackle this next
// })

// app.listen(5173)
// }

// createServer();

/*
// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

const server = http.createServer(async (req, res) => {
  await processRequest(req, res);
});

// Add Vite or respective production middlewares
let vite;
// if (!isProduction) {
const { createServer } = await import("vite");
vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  base,
});
// app.use(vite.middlewares);
// } else {
//   const compression = (await import('compression')).default
//   const sirv = (await import('sirv')).default
//   app.use(compression())
//   app.use(base, sirv('./dist/client', { extensions: [] }))
// }


const hostname = "localhost";
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*
// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace("<!--app-head-->", rendered.head ?? "")
      .replace("<!--app-html-->", rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e: any) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
*/
