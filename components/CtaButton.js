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
    this.root.appendChild(ctaButtonTemplate.content.cloneNode(true));
    this.button = this.root.querySelector(".cta-button");
  }

  connectedCallback() {
    this.button = this.root.querySelector(".cta-button");

    if (this.getAttribute("type") === "submit") {
      eventBus.on("validate", (e) => {
        this.updateState(e.detail.isValid);
        this.button.addEventListener("click", () =>
          eventBus.emit("submit-field")
        );
      });
    }

    if (this.getAttribute("type") === "dismiss") {
      this.updateState(true);
      this.button.addEventListener("click", () =>
        eventBus.emit("dismiss-modal")
      );
    }
  }

  updateState(isValid) {
    this.button.toggleAttribute("disabled", !isValid);
    this.button.classList.toggle("active", isValid);
  }
}

customElements.define("ctabutton-c", CtaButton);
