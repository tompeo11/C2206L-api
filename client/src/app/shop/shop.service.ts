import { Injectable } from '@angular/core';
import { IPagination } from '../models/IPagination';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBrand } from '../models/brand';
import { IType } from '../models/type';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  apiUrl = 'https://localhost:5001/api/product';

  constructor(private http: HttpClient) { }

  getProducts(typeId?: number): Observable<IPagination | null>{
    let params = new HttpParams();
    if(typeId){
      params = params.append('typeId', typeId.toString());
    }

    return this.http.get<IPagination>(this.apiUrl + '?pageSize=20',{params});
  }

  getBrands(): Observable<IBrand[]>{
    return this.http.get<IBrand[]>(this.apiUrl + '/brands');
  }

  getTypes(): Observable<IType[]>{
    return this.http.get<IType[]>(this.apiUrl + '/types');
  }
}