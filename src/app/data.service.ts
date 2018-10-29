import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Company } from './company';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get('src/company.json').pipe(map(data => {
      console.log(data);
      return data['companies'];
    }));
  }


  // getCompanys(): Observable<any> {
  //   return this.http.get('src/company.json').pipe(map(data => {
  //     const companysList = data['companies'];
  //     return companysList.map(function (company: any) {
  //       console.log(company.monthRevenue.valueOf());
  //       if (company.monthRevenue.valueOf() > 0) {
  //         return company;
  //       }
  //     });
  //   }));
  // }
}
