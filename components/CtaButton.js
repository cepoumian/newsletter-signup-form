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
      <!-- opacity: 0.5; -->
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

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "type") {
      if (newValue === "submit") {
        document.addEventListener("email-validation", (e) => {
          this.updateState(e.detail.isValid);
        });
      }
      if (newValue === "dismiss") {
        this.updateState(true);
        this.button.addEventListener("click", () => {
          this.dispatchEvent(new CustomEvent("cta-clicked", { bubbles: true }));
        });
      }
    }
  }

  updateState(isValid) {
    if (isValid) {
      this.button.removeAttribute("disabled");
      this.button.classList.add("active");
    } else {
      this.button.setAttribute("disabled", "");
      this.button.classList.remove("active");
    }
  }
}

customElements.define("ctabutton-c", CtaButton);
