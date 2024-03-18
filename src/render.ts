import type { Provider } from "./providers";
import spidLogo from "./spid-ico-circle-bb.svg";
import cieLogo from "./logo_cie_id.svg";

/**
 * Returns the HTML for the SPID dialog
 * @param providers the list of SPID providers
 * @returns the HTML for the dialog
 */
export const renderDialog = (providers: Provider[]) => {
  return `
    <dialog id="spid-dialog">
      <ul class="spid-providers">
      ${renderProviders(providers)}
      </ul>
    </dialog>
  `;
};

/**
 * Returns the HTML for the list of SPID providers
 * @param providers the list of SPID providers
 * @returns the HTML for the list
 */
const renderProviders = (providers: Provider[]) => {
  let list = "";

  for (const provider of providers) {
    list += `
    <li>
        <a href="${provider.registry_link}" target="_blank">
            <img src="${provider.logo_uri}" alt="${provider.organization_name}">
        </a>
    </li>
    `;
  }
  return list;
};

/**
 * Returns the HTML for a SPID button, based on the language
 * @param lang the language of the button (`en` or `it`)
 * @returns the HTML for the button
 */
export const renderButton = (lang: "it" | "en", type: "spid" | "cie") => {
  if (lang === "en" && type === "spid") {
    return btnTemplate(spidLogo, "SPID logo", "Enter via SPID");
  }
  if (lang === "it" && type === "spid") {
    return btnTemplate(spidLogo, "Logo SPID", "Entra con SPID");
  }
  if (lang === "en" && type === "cie") {
    return btnTemplate(cieLogo, "CIE logo", "Enter via CIE");
  }
  if (lang === "it" && type === "cie") {
    return btnTemplate(cieLogo, "Logo CIE", "Entra con CIE");
  }
  throw new Error(`Language ${lang} not supported`);
};

/**
 * Returns the HTML for a SPID/CIE button
 * @param alt the alt text for the button's image
 * @param label the label for the button
 * @returns
 */
const btnTemplate = (logo: string, alt: string, label: string) => `
      <button class="spid-button">
        <img src="${logo}" alt="${alt}" />
        <p>${label}</p>
      </button>
`;
