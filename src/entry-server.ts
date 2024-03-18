import { fetchProviders } from "./providers";
import { randomSort } from "./utils";
import { renderDialog as _renderDialog } from "./render";
import stylesheet from "./spid-button.css?inline";

export { renderButton } from "./render";

/**
 * Returns the SPID dialog, where the IDPs are randomized
 * @returns the HTML for the SPID dialog
 */
export const renderDialog = async () => {
  const providers = randomSort(await fetchProviders());
  return _renderDialog(providers);
};

/**
 * We import the CSS on the server side to avoid layout shifts
 * @returns the CSS for the SPID button
 */
export const renderHead = () => {
  return `<style>${stylesheet}</style>`;
};
