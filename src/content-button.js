import globalStyle from './global-style.js';
import basicAtom from './basic-atom.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${globalStyle}

    ${basicAtom}

    .button-container {
      padding: 8px;
    }

    .button-container.icon-btn {
      padding: 8px 2px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 1rem;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 100%;
      height: 40px;
    }

    button.icon {
      display: none;
      width: auto;
      position: relative;
      margin-right: 8px;
      font-size: 36px;
    }

    button.icon-label-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button.icon-label-btn .icon {
      display: block;
    }

    button.icon-btn {
      padding: 0;
      font-size: 0;

      width: 50px;
      min-width: 50px;
    }

    button.icon-btn .icon {
      display: block;
      margin: 0;
    }
  </style>

  <div class="button-container">
    <button class="basic-atom">Label</button>
  </div>
`;

class ContentButton extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$buttonContainer = this._shadowRoot.querySelector(
      '.button-container'
    );
    this.$button = this._shadowRoot.querySelector('button');

    this.$button.addEventListener('click', () =>
      this.dispatchEvent(new CustomEvent('onClick'))
    );
  }

  connectedCallback() {
    if (this.hasAttribute('as-atom')) {
      this.updateAsAtom();
    }
  }

  updateAsAtom() {
    this.$buttonContainer.style.padding = '0px';
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;

    this.render();
  }

  render() {
    this.$button.innerHTML = this.label;
  }
}

window.customElements.define('road-content-button', ContentButton);
