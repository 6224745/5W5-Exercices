import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiBaseUrl = "https://localhost:7263/api/"

  constructor(public http: HttpClient) { }

  async createTestData(name:string){
    let testData = {
      name: name
    }
    await lastValueFrom(this.http.post<any>(this.apiBaseUrl + 'TestData/CreateData', testData));
  }
}
