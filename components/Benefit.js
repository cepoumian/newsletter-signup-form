const benefitTemplate = document.createElement("template");

benefitTemplate.innerHTML = /* html */ `
  <style>
    li {
      list-style: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
    }
  </style>
  <li>
    <img src="/assets/images/icon-list.svg" alt="" />
    <slot></slot>
  </li>
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
