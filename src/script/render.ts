import type { Provider } from "./providers";

export const renderProviders = async (elem: HTMLElement, providers: Provider[]) => {
  const list = document.createElement("ul");
  list.classList.add("spid-providers");

  for (const provider of providers) {
    list.innerHTML += `
    <li>
        <a href="${provider.registry_link}" target="_blank">
            <img src="${provider.logo_uri}" alt="${provider.organization_name}">
        </a>
    </li>
    `;
  }
  elem.appendChild(list);
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

  if(!document.querySelector("#spid-dialog")) {
    document.body.appendChild(clonedDialog);
  }
};

/**
 * Initializes the SPID dialog and adds event listeners to the buttons
 * @returns the dialog element
 */
export const initDialog = () => {
  const spidDialog = document.querySelector(
    "#spid-dialog",
  ) as HTMLDialogElement;
  const spidButton = document.querySelectorAll(".spid-button");

  for (const button of spidButton) {
    button.addEventListener("click", () => {
      spidDialog.showModal();
    });
  }

  spidDialog.addEventListener("click", (event) => {
    if (event.target === spidDialog) {
      spidDialog.close();
    }
  });

  return spidDialog;
};
