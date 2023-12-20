import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  faTrash = faTrash;
  faCircleMinus = faCircleMinus;
  faCirclePlus = faCirclePlus;

  constructor(public basketService : BasketService){

  }
}
