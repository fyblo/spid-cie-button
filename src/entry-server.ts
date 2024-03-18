import { fetchProviders } from "./providers";
import { randomSort } from "./utils";
import { renderDialog, renderButton } from "./render";

export const render = async () => {
  const providers = randomSort(await fetchProviders());
  renderButton("en", "cie");
  renderButton("it", "cie");
  renderButton("en", "spid");
  renderButton("it", "spid");
  const appHtml = `
    ${renderButton("it", "spid")}
    <br />
    ${renderButton("en", "spid")}
    <br />
    ${renderButton("it", "cie")}
    <br />
    ${renderButton("en", "cie")}
    ${renderDialog(providers)}
  `;
  return { appHtml };
};
