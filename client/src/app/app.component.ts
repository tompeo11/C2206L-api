import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    var basketId = localStorage.getItem('basket_id');

    if (basketId) {
      console.log(basketId);
      this.basketService.getBasket(basketId).subscribe(() => {});
    }
  }
}
