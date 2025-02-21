import { eventBus } from "../eventBus.js";

const fieldTemplate = document.createElement("template");

fieldTemplate.innerHTML = /* html */ `
  <style>
    .field {
      display: flex;
      flex-direction: column;
    }

    .container {
      display: flex;
      justify-content: space-between;
    }

    .field label {
      font-size: var(--fs-300);
      color: var(--text-main);
      font-weight: var(--fw-bold);
      margin-bottom: var(--spacing-100);
    }

    .field input {
      padding: var(--spacing-200);
      border: 1px solid var(--clr-blue-800);
      border-radius: var(--border-radius-100);
      font-size: var(--fs-400);
      color: var(--text-main);
    }

    .field.error input {
      border-color: var(--clr-red);
      background-color: hsla(4, 100.00%, 66.70%, 0.20);
    }

    .error-message {
      color: var(--clr-red);
      font-size: var(--fs-300);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease-in-out;
    }

    .field.error .error-message {
      opacity: 1;
      visibility: visible;
    }
  </style>
  <div class="field">
    <div class="container">
      <label for="input"></label>
      <span class="error-message" aria-live="polite"></span>
    </div>
    <input id="input" />
  </div>
`;

class Field extends HTMLElement {
  static get observedAttributes() {
    return ["type"];
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.root.appendChild(fieldTemplate.content.cloneNode(true));
    this.input = this.root.querySelector("input");
    this.field = this.root.querySelector(".field");
    this.errorMessage = this.root.querySelector(".error-message");
    this.label = this.root.querySelector("label");

    if (this.getAttribute("type") === "email") {
      this.input.addEventListener("input", () => this.validateEmail());
      this.input.setAttribute("type", "email");
      this.label.textContent = "Email address";
      this.errorMessage.textContent = "Valid email required";
    }
  }

  disconnectedCallback() {
    if (this.getAttribute("type") === "email") {
      this.input.removeEventListener("input", () => this.validateEmail());
    }
  }

  validateEmail() {
    const email = this.input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    this.field.classList.toggle("error", !isValid);

    eventBus.emit("validate", { isValid });
  }

  getEmail() {
    return this.input.value.trim();
  }

  reset() {
    this.input.value = "";
    this.field.classList.remove("error");
  }
}

customElements.define("field-c", Field);
