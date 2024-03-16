import { fetchProviders } from "./providers";
import { createButton, initDialog, renderProviders } from "./render";
import { randomSort } from "./utils";

document.addEventListener("DOMContentLoaded", async () => {
  const providers = randomSort(await fetchProviders());
  createButton("app", "eng");
  createButton("app", "ita");
  const dialog = initDialog();
  renderProviders(dialog, providers);
});
