import "./spid-button.css";

/**
 * Initializes the SPID dialog and adds event listeners to the buttons
 * @returns the dialog element
 */
export const initDialog = () => {
  const spidDialog = document.querySelector(
    "#spid-dialog",
  ) as HTMLDialogElement;
  const spidButton = document.querySelectorAll(".spid-button");
  const spidSearch = document.querySelector(
    "#spid-dialog input[type=search]",
  ) as HTMLInputElement;

  for (const button of spidButton) {
    button.addEventListener("click", () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      document.body.style.overflow = "hidden";
      spidDialog.showModal();
      if (isMobile) spidSearch.blur();
    });
  }

  spidDialog.addEventListener("click", (event) => {
    if (event.target === spidDialog) {
      spidDialog.close();
    }
  });

  spidDialog.addEventListener("close", () => {
    document.body.style.overflow = "auto";
    console.log("spidDialog close");
  });

  spidSearch.addEventListener("input", (event) => {
    const searchWord = (event.target as HTMLInputElement).value;
    const providers = document.querySelectorAll(
      ".spid-providers li:not(.spid-idp-search)",
    ) as NodeListOf<HTMLLIElement>;

    console.log("searchWord", searchWord);

    filterProviders(searchWord.toLowerCase(), providers);
  });

  return spidDialog;
};

const filterProviders = (
  word: string,
  providers: NodeListOf<HTMLLIElement>,
) => {
  for (const provider of providers) {
    if (provider.dataset.idpName?.toLowerCase().includes(word)) {
      provider.style.display = "block";
    } else {
      provider.style.display = "none";
    }
  }
};

export default {
  initDialog,
};
