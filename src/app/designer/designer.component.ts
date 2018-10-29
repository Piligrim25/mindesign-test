import { Component, OnInit, Input, Output, AfterContentChecked, EventEmitter } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { Company } from '../company';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';

@Component({
  providers: [FilterComponent],
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit, AfterContentChecked {

  @Input()
  items: Array<any>;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onItemSelected = new EventEmitter<Company>();

  ones = false;
  companyChart = [];
  month = 0;
  total = 0;
  edit = false;
  selectedCompany: Company;
  category = [];

  constructor() { }

  ngOnInit() { }

  ngAfterContentChecked() {
    if (this.items !== undefined && !this.ones) {
      this.ones = true;
      this.createChart(this.items);
      this.calculateMonth(this.items);
      this.calculateTotal(this.items);
      this.getCategory();
    }
  }

  getCategory() {
    this.category = Array.from(new Set(this.items.map(element => {
      return element.category;
    })));
  }

  getItem() {
    this.onItemSelected.emit(this.selectedCompany);
  }

  calculateMonth(items) {
    this.month = 0;
    items.forEach(item => {
      this.month += item.monthBalance;
    });
  }

  calculateTotal(items) {
    this.total = 0;
    items.forEach(item => {
      this.total += item.balance;
    });
  }

  selectCategory(companyCategory: any) {
    const companies: Array<Company> = [];
    this.items.forEach(item => {
      if (item.category === companyCategory) {
        companies.push(item);
      } if (companyCategory === 'Все категории') {
        companies.push(item);
      }
      this.createChart(companies);
    });
    this.calculateMonth(companies);
    this.calculateTotal(companies);
  }

  selectCompany(companyName: any) {
    if (companyName !== 'Все вхождения') {
      this.edit = true;
    } else {
      this.edit = false;
    }

    this.selectedCompany = null;
    this.items.forEach(item => {
      if (item.name === companyName) {
        this.selectedCompany = item;
      }
    });
  }

  createChart(companies: Array<any>) {
    const companiesData = this.getCompaniesData(companies);
    this.companyChart = new Chart(
      'companyChart', {
        type: 'line',
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: companiesData,
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });
  }

  private getCompaniesData(companies: any[]) {
    return companies.map(company => {
      return {
        data: [company.weekStats.monday,
        company.weekStats.tuesday,
        company.weekStats.wednesday,
        company.weekStats.thursday,
        company.weekStats.friday,
        company.weekStats.saturday,
        company.weekStats.sunday],
        borderColor: '#3e59f383',
        fill: false
      };
    });
  }
}
