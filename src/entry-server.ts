import { fetchProviders } from "./providers";
import { randomSort } from "./utils";
import { renderDialog, renderButton } from "./render";
import stylesheet from "./spid-button.css?inline";
import TitilliumWeb from "./TitilliumWeb-SemiBold.ttf?inline";

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

export const renderHead = () => {
  return `
    <style>${stylesheet}</style>
    <link rel="preload" href="${TitilliumWeb}" as="font" type="font/ttf" crossorigin>
    <script type="module" src="/src/entry-client.ts"></script>
  `;
};
