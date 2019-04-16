import { Injectable } from '@angular/core';
import { productsList } from '../mock-products';
import { Products } from '../models/products';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private productsUrl = environment.baseUrl + '/api/products';  // URL to web api

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl);
    // return of(productsList);
  }

  deleteProduct(products: Products | number): Observable<Products> {
    const id = typeof products === 'number' ? products : products.productId;
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Products>(url, httpOptions);
  }

  saveProduct(products: Products): Observable<Products> {
    const url = `${this.productsUrl}`;
    return this.http.post<Products>(url, products, httpOptions);
  }

  getProductById(id: number): Observable<Products> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Products>(url);
  }

  updateProduct(product: Products): Observable<Products> {
    const url = `${this.productsUrl}`;
    return this.http.put<Products>(url, product, httpOptions);
  }
}
