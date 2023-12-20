import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BasketRoute } from './basket.routing';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(BasketRoute),
  ]
})
export class BasketModule { }