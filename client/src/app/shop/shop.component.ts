import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../models/IPagination';
import { ShopService } from './shop.service';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  apiUrl = 'https://localhost:5001/api/product';
  faRefresh = faRefresh; 
  faSearch = faSearch;
  products: any[] = [];

  constructor(private shopService: ShopService){}

  ngOnInit(): void{
    this.CallApi();
  }
  
  CallApi(){
    this.shopService.getProducts().subscribe(
      {
        next: (response: IPagination) => {
          console.log(response);
          this.products = response.data;
        },
        error: (err) => console.log(err)
      }
    );
  }
}
