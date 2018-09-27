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
    'end-time',
    'selected-date',
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
    this.selectedDate = this.getAttribute('selected-date') ? this.getAttribute('selected-date') : null;
    this.month = this.startMonth || this.today.getMonth();
    this.year  = this.startYear || this.today.getFullYear();
    this.weekDaysShortLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.setProps = this.setProps.bind(this);
    this.handleDateSelection = this.handleDateSelection.bind(this)
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
  console.log('this.this.selectedDate-->', this.selectedDate)
  this.monthGridCount = this.monthLength + this.startingDay > 35 ? 42 : 35;
  this.dates =  Array.apply(null, { length: this.monthGridCount }).map((x, i) => {
    i = i+1;
    let date = (i-this.startingDay > 0 && i-this.startingDay <= this.monthLength ? i-this.startingDay : false);
    return date || '.'
  })
  }

  get htmlTemplate () { 
    return html`
    <style>
      <%- style %>
    </style>
    <%- html %>
  `;
  };
  handleDateSelection(date) {
    this.selectedDate = date;
    date = `${this.month}/${date}/${this.year}`
    console.log('date from Month wc-->', date)
    this.dispatchEvent(new CustomEvent('date-tap', {bubbles: true, composed: true, detail:{
      date: date,
    }}));
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

window.customElements.define('zc-month-calendar', zcMonthCalendar);
