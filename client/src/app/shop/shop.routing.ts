import { Routes } from "@angular/router";
import { ShopComponent } from "./shop.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

export const ShopRoute: Routes = [
    {path: '', component: ShopComponent},
    {path: 'product/:id', component: ProductDetailsComponent},
];