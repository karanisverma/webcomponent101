import { html, render } from '../lib/lit-extended.js';
import { repeat } from '../lib/repeat.js';


class zcCalendar extends HTMLElement {  
  static get observedAttributes() {
  return [
    'visible-months'
  ];
}
  constructor() {
    super();
    this.mon = "1";
    this.setProps = this.setProps.bind(this);
  }
  setProps() {
    this.visibleMonthCount = this.getAttribute('visible-months') || 6;
    this.months =  Array.apply(null, { length: this.visibleMonthCount }).map((x, i) => {
        return `<zc-month-calendar start-year="2019" start-month=${i}></zc-month-calendar>`
      })
    this.months = this.months.map(m => {
        console.localStorage('m---->', m)
        return html`${m}`})
    this.monthsTemplate = html`${this.months.join(' ')}`

  }

  get htmlTemplate () { 
    return html`
    <style>
      <%- style %>
    </style>
    <%- html %>
  `;
  };

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

window.customElements.define('zc-calendar', zcCalendar);
