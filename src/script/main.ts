import { fetchProviders } from "./providers";
import { renderProviders } from "./render";
import { randomSort } from "./utils";

document.addEventListener("DOMContentLoaded", async () => {
  const fetchedProviders = await fetchProviders();
  const providers = randomSort(fetchedProviders);
  renderProviders(providers);
});

const spidDialog = document.querySelector("#spid-dialog") as HTMLDialogElement;
const spidButton = document.querySelectorAll(".spid-button");

for (const button of spidButton) {
  button.addEventListener("click", () => {
    spidDialog.showModal();
  });
}

spidDialog.addEventListener("click", (event) => {
  if (event.target === spidDialog) {
    spidDialog.close();
  }
});
