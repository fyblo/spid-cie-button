import type { Provider } from "./providers";
import spidLogo from "./spid-ico-circle-bb.svg";
import cieLogo from "./logo_cie_id.svg";

export const renderDialog = (providers: Provider[]) => {
  return `
    <dialog id="spid-dialog">
      <ul class="spid-providers">
      ${renderProviders(providers)}
      </ul>
    </dialog>
  `;
};

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
 * Generates a new SPID button at the target. It also generates the SPID dialog, if it doesn't exist yet
 * @param targetId the id of the element to append the cloned template to
 * @param lang the language of the button to clone (`eng` or `ita`)
 */
export const createButton = (targetId: string, lang: string) => {
  const btnTemplate = document.querySelector(
    `#template-spid-button-${lang}`,
  ) as HTMLTemplateElement;
  const dialogTemplate = document.querySelector(
    "#template-spid-dialog",
  ) as HTMLTemplateElement;

  const clonedBtn = btnTemplate.content.cloneNode(true);
  const clonedDialog = dialogTemplate.content.cloneNode(true);

  const target = document.querySelector(`#${targetId}`);
  if (!target) throw new Error(`Element with id ${targetId} not found`);
  target.appendChild(clonedBtn);

  if (!document.querySelector("#spid-dialog")) {
    document.body.appendChild(clonedDialog);
  }
};
