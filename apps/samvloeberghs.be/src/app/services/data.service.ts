import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);

  getData(file: string): Observable<any> {
    return this.http.get(`http://localhost:4200${file}`);
  }

  getDataText(file: string): Observable<any> {
    return this.http.get(`http://localhost:4200${file}`, {responseType: 'text'});
  }

}
