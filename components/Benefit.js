const benefitTemplate = document.createElement("template");

benefitTemplate.innerHTML = /* html */ `
  <style>
    .benefit {
      list-style: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
    }
  </style>
  <div class="benefit">
    <img src="/assets/images/icon-list.svg" alt="" />
    <slot></slot>
  </div>
`;

class Benefit extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.root.appendChild(benefitTemplate.content.cloneNode(true));
  }
}

customElements.define("benefit-c", Benefit);
