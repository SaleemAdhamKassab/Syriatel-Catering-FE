import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // url = 'https://localhost:7075/api/';
  url = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };
  constructor(private http: HttpClient) {}
  GetAdminProducts() {
    return this.http.get<any>(this.url + 'AdminGategories', this.httpOptions);
  }
  newExtra(data: any) {
    return this.http.post<any>(this.url + 'Extras', data, this.httpOptions);
  }
  updateProduct(data: any) {
    return this.http.put<any>(
      this.url + 'Products?Id=' + data.Id,
      data,
      this.httpOptions
    );
  }
  createProduct(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'Products', data, this.httpOptions);
  }
  updateCategory(data: any) {
    return this.http.put<any>(
      this.url + 'Categories?Id=' + data.Id,
      data,
      this.httpOptions
    );
  }
  createCategory(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'Categories', data, this.httpOptions);
  }
  handelOrder(data: any) {
    return this.http.get<any>(
      this.url + 'HandelOrder?orderid=' + data,
      this.httpOptions
    );
  }
  cancelOrder(data: any) {
    return this.http.get<any>(
      this.url + 'RejectOrder?orderid=' + data,
      this.httpOptions
    );
  }
  diactiveCafetearia() {
    return this.http.get<any>(this.url + 'CloseSystem', this.httpOptions);
  }
  activeCafetearia() {
    return this.http.get<any>(this.url + 'OpenSystem', this.httpOptions);
  }
  getOrders(data: any) {
    const date = { date: data };
    return this.http.post<any>(
      // 'https://localhost:7075/api/Orders/getOrders',ks
      this.url + 'Orders/getOrders',
      date,
      this.httpOptions
    );
  }
  GetMyOrderById(d: any) {
    return this.http.get<any>(
      this.url + 'orderTransaction?orderid=' + d,
      this.httpOptions
    );
  }

  GetCafeteariaNews() {
    return this.http.get<any>(this.url + 'news', this.httpOptions);
  }
  GetSystemStatus() {
    return this.http.get<any>(this.url + 'SystemStatus', this.httpOptions);
  }
  getExtras() {
    return this.http.get<any>(this.url + 'Extras', this.httpOptions);
  }
  updateExtra(data: any) {
    return this.http.put<any>(
      this.url + 'Extras?Id=' + data.Id,
      data,
      this.httpOptions
    );
  }
  addExtra(data: any) {
    return this.http.post<any>(this.url + 'Extras', data, this.httpOptions);
  }
  updateTitle(newData: any) {
    return this.http.put<any>(
      this.url + 'news?Id=' + newData.Id,
      newData,
      this.httpOptions
    );
  }
}
