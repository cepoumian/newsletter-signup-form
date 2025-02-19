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
    }
  </style>
  <button class="cta-button">
    <slot></slot>
  </button>
`;

class CtaButton extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.root.appendChild(ctaButtonTemplate.content.cloneNode(true));
  }
}

customElements.define("ctabutton-c", CtaButton);
