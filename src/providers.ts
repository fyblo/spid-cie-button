import { ofetch } from "ofetch";

export type Provider = {
  entity_id: string;
  organization_name: string;
  logo_uri: string;
  registry_link: string;
};

export const fetchProviders = async () =>
  await ofetch<Provider[]>("https://registry.spid.gov.it/entities-idp", {
    query: {
      output: "json",
      custom: "info_display_base",
    },
    parseResponse: JSON.parse,
  });
