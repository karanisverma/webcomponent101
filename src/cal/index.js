import { html, render } from '../lib/lit-extended.js';
import { directive } from '../lib/lit-html.js';
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
    this.today = new Date();
    this.setProps = this.setProps.bind(this);
    this.selectedDate = 1;
    this.handleDateSelection = this.handleDateSelection.bind(this);
  }
  handleDateSelection(data) {
    this.selectedDate = data.detail.date;
    this.updateShadowDom();
  }
  setProps() {
    this.visibleMonthCount = this.getAttribute('visible-months') || 6;
    this.months =  Array.apply(null, { length: this.visibleMonthCount }).map((x, i) => {
        var result = new Date(this.today);
        result.setDate(1);
        result.setMonth(i+this.today.getMonth())
        return result
      })
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
