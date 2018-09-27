import { html, render } from '../lib/lit-extended.js';
import { repeat } from '../lib/repeat.js';

// const result = myTemplate({title: 'yay this is awesome', body: 'lit-html is way too cool'});
// render(result, document.body);


class zcMonthCalendar extends HTMLElement {  
  static get observedAttributes() {
  return [
    'start-year',
    'end-year',
    'start-month',
    'end-month',
    'start-time',
    'end-time'
  ];
}
  constructor() {
    super();
  }
  setProps() {
    this.startYear = this.getAttribute('start-year');
    this.endYear = this.getAttribute('end-year');
    this.startMonth = this.getAttribute('start-month');
    this.endMonth = this.getAttribute('end-month');
    this.startTime = this.getAttribute('start-time');
    this.endTime = this.getAttribute('end-time');
    this.today = new Date();

    this.month = this.startMonth || this.today.getMonth();
    this.year  = this.startYear || this.today.getFullYear();
    this.weekDaysShortLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.setProps = this.setProps.bind(this);
    this.firstDay = new Date(this.year, this.month, 1);
    this.startingDay = this.firstDay.getDay();
    this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.monthLength = this.daysInMonth[this.month];
    if (this.month == 1) {
      console.log('code under if condition', this.month)
      if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
          this.monthLength = 29;
      }
  };
  this.monthGridCount = this.monthLength + this.startingDay > 35 ? 42 : 35;
  this.dates =  Array.apply(null, { length: this.monthGridCount }).map((x, i) => {
    i = i+1;
    let date = (i-this.startingDay > 0 && i-this.startingDay <= this.monthLength ? i-this.startingDay : false);
    return date || '.'
  })
    console.log('this.startMonth-->', this.startMonth)
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

window.customElements.define('zc-month-calendar', zcMonthCalendar);
