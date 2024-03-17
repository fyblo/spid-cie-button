import { fetchProviders } from "./providers";
import { randomSort } from "./utils";
import { renderDialog, renderButton } from "./render";

export const render = async () => {
  const providers = randomSort(await fetchProviders());
  renderButton("en");
  renderButton("it");
  renderDialog(providers);
  const html = `
    ${renderButton("en")}
    <br />
    ${renderButton("it")}
    ${renderDialog(providers)}
  `;
  return { html };
};
