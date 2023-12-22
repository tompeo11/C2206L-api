import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { IBasketItem } from '../models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  faTrash = faTrash;
  faMinusCircle = faCircleMinus;
  faPlusCircle = faCirclePlus;

  constructor(public basketService : BasketService) {}

  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

  removeItemQuantity(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
}
