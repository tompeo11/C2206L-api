import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { IProduct } from 'src/app/models/product';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle; 
  product : IProduct | undefined;

  constructor(private activatedRoute: ActivatedRoute, private shopService : ShopService) {
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shopService.getProductById(+id!).subscribe({
      next: (p) => this.product = p,
      error: (err) => console.log(err)
    });
  }
}
