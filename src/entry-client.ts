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

console.log("Test");
