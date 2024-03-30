import { fetchProviders } from "./providers";
import { randomSort } from "./utils";
import { renderDialog as _renderDialog, type DialogInput, type RPEndpoint } from "./render";
import stylesheet from "./spid-button.css?inline";

export { renderButton } from "./render";

type RenderDialogInput = Omit<DialogInput, "providers">;

/**
 * Returns the SPID dialog, where the IDPs are randomized
 * @param lang the language of the dialog (`en` or `it`)
 * @param rpEndpoint the endpoint for the relaying party that should receive the request, based on the organization name
 * @returns the HTML for the SPID dialog
 */
export const renderDialog = async (options: RenderDialogInput) => {
  const providers = randomSort(await fetchProviders());
  return _renderDialog({ providers, ...options });
};

/**
 * We import the CSS on the server side to avoid layout shifts
 * @returns the CSS for the SPID button
 */
export const renderHead = () => {
  return `<style>${stylesheet}</style>`;
};
