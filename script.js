document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const successBox = document.querySelector(".success");
  const cardBox = document.querySelector(".card");
  const ctaButton = document.querySelector("ctabutton-c");
  const emailField = document.querySelector("field-c");

  ctaButton.addEventListener("click", () => {
    if (!ctaButton.shadowRoot.querySelector("button").disabled) {
      cardBox.classList.add("hidden");
      successBox.classList.remove("hidden");
    }
  });

  document.addEventListener("cta-clicked", () => {
    cardBox.classList.remove("hidden");
    successBox.classList.add("hidden");
    emailField.shadowRoot.querySelector("input").value = "";
    ctaButton.shadowRoot.querySelector("button").setAttribute("disabled", "");
    ctaButton.shadowRoot.querySelector("button").classList.remove("active");
  });
});
