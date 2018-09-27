import { html, render } from '../lib/lit-extended.js';
import { directive } from '../lib/lit-html.js';
import { repeat } from '../lib/repeat.js';


class zcTimePicker extends HTMLElement {  
  static get observedAttributes() {
  return [
    ''
  ];
}
  constructor() {
    super();
    this.selectedTime = null;
    this.handleTimeSelection = this.handleTimeSelection.bind(this);
    this.timeList = Array.apply(null, { length: 48 }).map((x, i) => {
      let temp = i;
      let ampm = 'AM';
      if (i >= 24) {
        temp = i - 24;
        ampm = 'PM';
      }
      return temp % 2 ? `${(temp + 1) / 2}:30 ${ampm}` : `${temp / 2 + 1}:00 ${ampm}`;
    })
  }
  setProps() {
    // this.visibleMonthCount = this.getAttribute('visible-months') || 6;
  }

  get htmlTemplate () { 
    return html`
    <style>
      <%- style %>
    </style>
    <%- html %>
  `;
  };
  handleTimeSelection(time) {
    this.selectedTime = time;
    this.updateShadowDom()
  }
  connectedCallback() {
    this.createShadowDom();
  }
  createShadowDom() {
    this.attachShadow({ mode: 'open' });
    this.updateShadowDom();
  }
  updateShadowDom() {
    if (this.shadowRoot) {
      render(this.htmlTemplate, this.shadowRoot);
    }
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal != newVal) {
      this.setProps();
      this.updateShadowDom();
    }
  }
}

window.customElements.define('zc-time-picker', zcTimePicker);
