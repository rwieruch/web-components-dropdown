import globalStyle from './global-style.js';
import basicAtom from './basic-atom.js';
import * as COLORS from './colors.js';

import './content-button.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${globalStyle}

    ${basicAtom}

    .dropdown {
      box-sizing: border-box;
      padding: 3px 8px 8px;
      cursor: pointer;
    }

    .dropdown.open button:after {
      content: '\ea09';
    }

    .dropdown.open .dropdown-list {
      display: flex;
      flex-direction: column;
    }

    .label {
      display: block;
      margin-bottom: 5px;
      color: ${COLORS.trblack.hex};
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
    }

    button {
      width: 100%;
      position: relative;
      padding-right: 45px;
      padding-left: 8px;
      font-size: 16px;
      font-weight: 600;
      text-align: left;
      white-space: nowrap;
    }

    button:after {
      content: '\ea05';
      position: absolute;
      top: 6px;
      right: 13px;
      color: ${COLORS.trgrey3.hex};
    }

    button:active:after,
    button:hover:after {
      color: ${COLORS.trblue3.hex};
    }

    button:disabled:after {
      color: ${COLORS.trgrey5.hex};
    }

    .dropdown-list-container {
      position: relative;
    }

    .dropdown-list {
      position: absolute;
      width: 100%;
      display: none;
      max-height: 192px;
      overflow-y: auto;
      margin: 4px 0 0;
      padding: 0;
      border: 1px solid ${COLORS.trgrey2.hex};
      box-shadow: 0 2px 4px 0 rgba(${
        COLORS.trblack.rgb
      }, 0.05), 0 2px 8px 0 rgba(${COLORS.trgrey2.rgb}, 0.4);
      list-style: none;
    }

    .dropdown-list li {
      display: flex;
      align-items: center;
      margin: 4px 0;
      padding: 0 7px;
      border-right: none;
      border-left: none;
      border-width: 0;
      font-size: 16px;
      flex-shrink: 0;
      height: 40px;
    }

    .dropdown-list li:not(.selected) {
      box-shadow: none;
    }

    .dropdown-list li.selected {
      font-weight: 600;
      z-index: 100;
    }

    .dropdown-list li:active,
    .dropdown-list li:hover,
    .dropdown-list li.selected {
      border-right: none;
      border-left: none;
      border-width: 1px;
    }

    .dropdown-list li:focus {
      border-width: 2px;
    }

    .dropdown-list li:disabled {
      color: rgba(${COLORS.trblack.rgb}, 0.6);
      font-weight: 300;
    }
  </style>

  <div class="dropdown">
    <span class="label">Label</span>

    <road-content-button as-atom>Content</road-content-button>

    <div class="dropdown-list-container">
      <ul class="dropdown-list"></ul>
    </div>
  </div>
`;

class Dropdown extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: 'open' });
    this._sR.appendChild(template.content.cloneNode(true));

    this.open = false;

    this.render = this.render.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);

    this.$label = this._sR.querySelector('.label');
    this.$dropdown = this._sR.querySelector('.dropdown');
    this.$dropdownList = this._sR.querySelector('.dropdown-list');
    this.$contentButton = this._sR.querySelector(
      'road-content-button'
    );

    this.$contentButton.addEventListener('onClick', this.toggleOpen);
  }

  static get observedAttributes() {
    return ['label', 'option', 'options'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;

    switch (name) {
      case 'options':
        this.options = JSON.parse(newVal);
        break;
      default:
        this[name] = newVal;
    }

    this.render();
  }

  toggleOpen(event) {
    this.open = !this.open;

    this.render();
  }

  render() {
    if (this.options) {
      this.$dropdownList.innerHTML = '';

      Object.keys(this.options).forEach(key => {
        let option = this.options[key];
        let $option = document.createElement('li');
        $option.innerHTML = option.label;
        $option.setAttribute('id', key);

        $option.classList.add('basic-atom');

        if (this.option && this.option === key) {
          $option.classList.add('selected');
        }

        $option.addEventListener('click', () => {
          this.option = key;
          this.open = false;

          this.dispatchEvent(
            new CustomEvent('onChange', { detail: key })
          );

          this.render();
        });

        this.$dropdownList.appendChild($option);
      });
    }

    if (this.label) {
      this.$label.innerHTML = this.label;
    }

    if (this.option && this.options) {
      this.$contentButton.setAttribute(
        'label',
        this.options[this.option].label
      );
    }

    this.open
      ? this.$dropdown.classList.add('open')
      : this.$dropdown.classList.remove('open');
  }
}

window.customElements.define('road-dropdown', Dropdown);
