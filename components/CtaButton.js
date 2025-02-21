import { eventBus } from "../eventBus.js";

const ctaButtonTemplate = document.createElement("template");

ctaButtonTemplate.innerHTML = /* html */ `
  <style>
    .cta-button {
      width: 100%;
      color: var(--text-white);
      font-weight: var(--fw-bold);
      border-radius: var(--border-radius-100);
      background-color: var(--background-blue);
      padding: var(--spacing-200) var(--spacing-900);
      padding: var(--spacing-200) 0;
      border: none;
    }

    .cta-button.active {
      opacity: 1;
      background: var(--clr-gradient);
      cursor: pointer;
    }

    .cta-button:disabled {
      cursor: not-allowed;
    }
  </style>
  <button class="cta-button" disabled>
    <slot></slot>
  </button>
`;

class CtaButton extends HTMLElement {
  static get observedAttributes() {
    return ["type"];
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.root.appendChild(ctaButtonTemplate.content.cloneNode(true));
    this.button = this.root.querySelector(".cta-button");

    if (this.getAttribute("type") === "submit") {
      this.button.addEventListener("click", this.submit);
    }

    if (this.getAttribute("type") === "dismiss") {
      this.button.addEventListener("click", this.dismiss);
      this.updateState(true);
    }

    eventBus.on("validate", (e) => {
      this.updateState(e.detail.isValid);
    });
  }

  disconnectedCallback() {
    eventBus.off("validate", this.updateState);

    if (this.getAttribute("type") === "submit") {
      this.button.removeEventListener("click", this.submit);
    }

    if (this.getAttribute("type") === "dismiss") {
      this.button.removeEventListener("click", this.dismiss);
    }
  }

  updateState(isValid) {
    this.button.toggleAttribute("disabled", !isValid);
    this.button.classList.toggle("active", isValid);
  }

  submit() {
    eventBus.emit("submit-field");
  }

  dismiss() {
    eventBus.emit("dismiss-modal");
  }
}

customElements.define("ctabutton-c", CtaButton);
