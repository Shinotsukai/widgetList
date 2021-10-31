import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  rootURL = '/api';

  getWidgetOrders(){
    return this.http.get(this.rootURL +'/order');
  }

  newOrder(qty:number){
    return this.http.post(this.rootURL+'/order',{qty})
  }
}
