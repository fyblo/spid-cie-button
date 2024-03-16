import type { Provider } from "./providers";

export const renderProviders = async (providers: Provider[]) => {
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
  document.querySelector("#spid-dialog")?.appendChild(list);
};
