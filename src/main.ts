import { fetchProviders } from "./providers";
import { createButton, renderDialog } from "./render";
import { randomSort } from "./utils";

document.addEventListener("DOMContentLoaded", async () => {
  const providers = randomSort(await fetchProviders());
  createButton("app", "eng");
  createButton("app", "ita");
  renderDialog(providers);
});
