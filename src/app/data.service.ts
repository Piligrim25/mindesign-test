import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Company } from './company';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get('https://api.myjson.com/bins/ccdpu').pipe(map(data => {
      return data['companies'];
    }));
  }
}
