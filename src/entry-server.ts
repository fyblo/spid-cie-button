import { fetchProviders } from "./providers";
import { randomSort } from "./utils";
import { renderDialog, renderButton } from "./render";

/**
 * We want to render all the possible combinations of buttons, that is why we render it 4 times, once for each combination of language and type
 * @returns the HTML for the SPID/CIE buttons and dialog
 */
export const render = async () => {
  const providers = randomSort(await fetchProviders());
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
