import { Injectable } from '@angular/core';
import { IPagination } from '../models/IPagination';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBrand } from '../models/brand';
import { IType } from '../models/type';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  apiUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) {}

  getProducts(sort: string, pageNumber: number, pageSize: number, typeId?: number, brandId?: number, search?: string): Observable<IPagination | null> {
    let params = new HttpParams();

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }

    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }

    if (search) {
      params = params.append('search', search);
    }

    params = params.append('sort', sort);
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IPagination>(this.apiUrl + '/product', { params });
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.apiUrl + '/product/brands');
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.apiUrl + '/product/types');
  }

  getProductById(id: number) : Observable<IProduct> {
    return this.http.get<IProduct>(this.apiUrl + '/product/' + id)
  }
}
