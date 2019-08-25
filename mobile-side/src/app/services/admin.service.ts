import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Product } from '../models/product';

let API_URL = 'http://192.168.0.11:8080/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.userService.currentUserValue.token,
      "Content-Type": "application/json; charset=UTF-8"
    });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API_URL + "user-update", JSON.stringify(user), { headers: this.headers });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(API_URL + "user-delete", JSON.stringify(user), { headers: this.headers });
  }

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + 'user-all', { headers: this.headers });
  }

  numberOfUsers(): Observable<any> {
    return this.http.get(API_URL + "user-number", { headers: this.headers });
  }

  //products
  createProduct(product: Product): Observable<any> {
    return this.http.post(API_URL + "product-create", JSON.stringify(product), { headers: this.headers });
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(API_URL + "product-update", JSON.stringify(product), { headers: this.headers });
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.post(API_URL + "product-delete", JSON.stringify(product), { headers: this.headers });
  }

  findAllProducts(): Observable<any> {
    return this.http.get(API_URL + "product-all", { headers: this.headers });
  }

  numberOfProducts(): Observable<any> {
    return this.http.get(API_URL + "product-number", { headers: this.headers });
  }

  //transactions
  findAllTransactions(): Observable<any> {
    return this.http.get(API_URL + "transaction-all", { headers: this.headers });
  }

  numberOfTransactions(): Observable<any> {
    return this.http.get(API_URL + "transaction-number", { headers: this.headers });
  }

}
