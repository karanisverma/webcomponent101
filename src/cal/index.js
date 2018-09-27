import { html, render } from '../lib/lit-extended.js';
import { directive } from '../lib/lit-html.js';
import { repeat } from '../lib/repeat.js';


class zcCalendar extends HTMLElement {  
  static get observedAttributes() {
  return [
    'visible-months',
    'min-date',
    'max-date',
    'min-time',
    'max-time',
  ];
}
  constructor() {
    super();
    this.mon = "1";
    this.today = new Date();
    this.setProps = this.setProps.bind(this);
    this.selectedDate = '08/18/2018';
    // this.minDate = '08/10/2018';
    // this.maxDate = '10/10/2018';
    // this.minTime = '4:00';
    // this.maxTime = '10:00';
    this.handleDateSelection = this.handleDateSelection.bind(this);
  }
  handleDateSelection(data) {
    this.selectedDate = data.detail.date;
    this.updateShadowDom();
  }
  setProps() {
    this.minDate = this.getAttribute('min-date');
    this.maxDate = this.getAttribute('max-date');
    this.minTime = this.getAttribute('min-time') || '00:00';
    this.maxTime = this.getAttribute('max-time') || '23:30';
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
