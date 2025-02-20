import { eventBus } from "./eventBus.js";

document.addEventListener("DOMContentLoaded", () => {
  const successBox = document.querySelector(".success");
  const cardBox = document.querySelector(".card");
  const emailField = document.querySelector("field-c");
  const ctaButton = document.querySelector("ctabutton-c");

  eventBus.on("dismiss-modal", () => {
    cardBox.classList.remove("hidden");
    successBox.classList.add("hidden");
    eventBus.emit("reset-field");
  });

  eventBus.on("submit-field", () => {
    cardBox.classList.add("hidden");
    successBox.classList.remove("hidden");
  });

  eventBus.on("reset-field", () => {
    emailField.shadowRoot.querySelector("input").value = "";
    ctaButton.shadowRoot.querySelector("button").setAttribute("disabled", "");
    ctaButton.shadowRoot.querySelector("button").classList.remove("active");
  });
});
