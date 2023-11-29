import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  productList : Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const observable = this.http.get('http://localhost:5000/api/product/');
    observable
      .subscribe((data: any) => {
        this.productList = data.data;
      }, (error: any) => {
        console.error(error);
      }, () => {
        console.log(this.productList);
      });
  }
}
