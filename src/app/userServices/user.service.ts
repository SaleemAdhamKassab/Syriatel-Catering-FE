import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // url = 'https://localhost:7075/api/';
  url = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };
  constructor(private http: HttpClient) {}

  GetCafeteariaNews() {
    return this.http.get<any>(this.url + 'news', this.httpOptions);
  }

  GetMyUser() {
    const httpOptions = { 'Content-Type': 'application/json' };
    return this.http.get(this.url + 'CurrentUser', {
      responseType: 'text',
      withCredentials: true,
    });
  }
  GetDataUser(name: any): Observable<boolean> {
    return this.http.get<any>(
      this.url + 'Users/getMyUser?id=' + name,
      this.httpOptions
    );
  }

  GetProducts() {
    return this.http.get<any>(this.url + 'Categories', this.httpOptions);
  }

  GetMyOrders(data: any) {
    return this.http.get<any>(
      this.url + 'OrderUser?dateFilter=' + data,
      this.httpOptions
    );
  }
  createUser(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'Users', data, this.httpOptions);
  }
  newOrder(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'Orders', data, this.httpOptions);
  }

  GetMyOrderById(d: any) {
    return this.http.get<any>(
      this.url + 'orderTransaction?orderid=' + d,
      this.httpOptions
    );
  }
  updateInfoUser(data: any) {
    return this.http.put<any>(
      this.url + 'Users?Id=' + data.UserName,
      data,
      this.httpOptions
    );
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
  getOrders(data: any) {
    const date = { date: data };
    return this.http.post<any>(
      this.url + 'Orders/getOrders',
      data,
      this.httpOptions
    );
  }
  GetSystemStatus() {
    return this.http.get<any>(this.url + 'SystemStatus', this.httpOptions);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.url}Orders/${orderId}`, this.httpOptions);
  }
}
