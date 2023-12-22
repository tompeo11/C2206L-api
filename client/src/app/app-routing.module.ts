import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule)},
  {path: 'test-error', loadChildren: () => import('./test-error/test-error.module').then(mod => mod.TestErrorModule)},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
