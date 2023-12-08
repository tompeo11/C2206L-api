import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../models/IPagination';
import { ShopService } from './shop.service';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../models/product';
import { IBrand } from '../models/brand';
import { IType } from '../models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchElement : ElementRef | undefined;

  apiUrl = 'https://localhost:5001/api/product';

  faRefresh = faRefresh;
  faSearch = faSearch;

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];

  typeIdSelected: number = 0;
  brandIdSelected: number = 0;
  sortSelected = 'name';
  totalCount = 0;
  pageNumber = 1;
  pageSize = 3;
  search = '';

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService
      .getProducts(this.sortSelected, this.pageNumber, this.pageSize, this.typeIdSelected, this.brandIdSelected, this.search)
      .subscribe({
        next: (response: IPagination | null) => {
          this.products = response!.data;
          this.pageNumber = response!.pageNumber;
          this.pageSize = response!.pageSize;
          this.totalCount = response!.totalCount;
        },
        error: (err) => console.log(err),
      });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (err) => console.log(err),
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (err) => console.log(err),
    });
  }

  onSelectProductType(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSelectProductBrand(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onSortSelect(event: Event){
    this.sortSelected = (<HTMLSelectElement>event.target).value;
    this.getProducts();
  }

  onPageChanged(eventEmitterNumber: number){
    this.pageNumber = eventEmitterNumber;
    this.getProducts();
  }

  onSearch(){
    this.search = this.searchElement?.nativeElement.value;
    this.getProducts();
  }

  onReset(){
    this.searchElement!.nativeElement.value = '';
    this.typeIdSelected = 0;
    this.brandIdSelected = 0;
    this.sortSelected = 'name';
    this.totalCount = 0;
    this.pageNumber = 1;
    this.pageSize = 3;
    this.search = '';
    this.getProducts();
  }
}
