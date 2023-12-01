import { Injectable } from '@angular/core';
import { IPagination } from '../models/IPagination';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  apiUrl = 'https://localhost:5001/api/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IPagination>{
    return this.http.get<IPagination>(this.apiUrl + '?pageSize=20');
  }
}