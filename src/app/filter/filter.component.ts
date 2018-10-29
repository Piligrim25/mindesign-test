import { Component, OnInit, Output, Input } from '@angular/core';
import { HttpService } from '../data.service';
import { Company } from '../company';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

  @Input()
  items: Array<Company>;

  constructor(private httpService: HttpService) {
  }

  filter() {
    const myObserver = {
      next: x => this.items = x.map(function (company: any) {
        if (company.monthRevenue.valueOf() > 0) {
          return {
            id: company.id,
            name: company.name,
            category: company.type,
            weekStats: {
              monday: company.revenuePerWeek.monday,
              tuesday: company.revenuePerWeek.tuesday,
              wednesday: company.revenuePerWeek.wednesday,
              thursday: company.revenuePerWeek.thursday,
              friday: company.revenuePerWeek.friday,
              saturday: company.revenuePerWeek.saturday,
              sunday: company.revenuePerWeek.sunday,
            },
            balance: company.revenue,
            monthBalance: company.monthRevenue,
          };
        } else {
          return null;
        }
      }),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => this.items = this.items.filter(obj => obj !== null),
    };

    this.httpService.getCompanies().subscribe(myObserver);
  }

  getItemsList() {
    this.filter();
    return this.items;
  }

  getCompanyId(company: Company) {
    console.log(company.id);
  }

  ngOnInit() {
    this.filter();
  }
}
