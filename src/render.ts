import type { Provider } from "./providers";
import spidLogo from "./spid-ico-circle-bb.svg";
import cieLogo from "./logo_cie_id.svg";

/**
 * The endpoint for the relaying party that should receive the request,
 * based on the organization name
 */
export type RPEndpoint = (orgName: string) => string;

type DialogInput = {
  lang: "en" | "it";
  providers: Provider[];
  rpEndpoint: RPEndpoint;
};

/**
 * Returns the HTML for the SPID dialog
 * @param lang the language of the dialog (`en` or `it`)
 * @param providers the list of SPID providers
 * @param rpEndpoint the endpoint for the relaying party that should receive the request
 * @returns the HTML for the dialog
 */
export const renderDialog = ({ lang, providers, rpEndpoint }: DialogInput) => {
  return /*html*/ `
    <dialog id="spid-dialog">
      <ul class="spid-providers">
      ${renderHelpLinks(lang)}
      ${renderProviders(providers, rpEndpoint)}
      </ul>
    </dialog>
  `;
};

const renderHelpLinks = (lang: "en" | "it") => {
  if (lang === "en") {
    return /*html*/ `
      <li class="spid-idp-search">
        <input type="search" placeholder="Filter providers" />
        <a href="https://www.spid.gov.it/en" target="_blank">SPID?</a>
      </li>
    `;
  }
  if (lang === "it") {
    return /*html*/ `
      <li class="spid-idp-search">
      <input type="search" placeholder="Filtra provider" autofocus/>
        <a href="https://www.spid.gov.it" target="_blank">SPID?</a>
      </li>
    `;
  }
  throw new Error(`Language ${lang} not supported`);
};

/**
 * Returns the HTML for the list of SPID providers
 * @param providers the list of SPID providers
 * @returns the HTML for the list
 */
const renderProviders = (providers: Provider[], rpEndpoint: RPEndpoint) => {
  let list = "";

  console.log("SPID_DEVELOPMENT_MODE", process?.env.SPID_DEVELOPMENT_MODE);

  if (process?.env.SPID_DEVELOPMENT_MODE === "true") {
    const provider = { organization_name: "DEMO" };
    list += /*html*/ `
    <li data-idp-name="${provider.organization_name}">
        <a href="${rpEndpoint(provider.organization_name)}" target="_blank">
            ${provider.organization_name}
        </a>
    </li>
    `;
  }

  for (const provider of providers) {
    list += /*html*/ `
    <li data-idp-name="${provider.organization_name}">
        <a href="${rpEndpoint(provider.organization_name)}" target="_blank">
            <img src="${provider.logo_uri}" alt="${provider.organization_name}">
        </a>
    </li>
    `;
  }
  return list;
};

type ButtonInput = {
  lang: "en" | "it";
  type: "spid" | "cie";
};

/**
 * Returns the HTML for a SPID button, based on the language
 * @param lang the language of the button (`en` or `it`)
 * @param type the type of the button (`spid` or `cie`)
 * @returns the HTML for the button
 */
export const renderButton = ({ lang, type }: ButtonInput) => {
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
const btnTemplate = (logo: string, alt: string, label: string) => /*html*/ `
      <button class="spid-button">
        <img src="${logo}" alt="${alt}" />
        <p>${label}</p>
      </button>
`;
