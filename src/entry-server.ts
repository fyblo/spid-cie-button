import { fetchProviders } from "./providers";
import { randomSort } from "./utils";
import { renderDialog as _renderDialog } from "./render";
import stylesheet from "./spid-button.css?inline";
import TitilliumWeb from "./TitilliumWeb-SemiBold.ttf?inline";

export { renderButton } from "./render";

/**
 * Returns the SPID dialog, where the IDPs are randomized
 * @returns the HTML for the SPID dialog
 */
export const renderDialog = async () => {
  const providers = randomSort(await fetchProviders());
  return _renderDialog(providers);
};

export const renderHead = () => {
  return `
    <style>${stylesheet}</style>
    <link rel="preload" href="${TitilliumWeb}" as="font" type="font/ttf" crossorigin>
    <script type="module" src="/src/entry-client.ts"></script>
  `;
};
