import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { ToastrModule } from 'ngx-toastr';
import { OrderTotalsComponent } from './order-totals/order-totals.component';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
      preventDuplicates: true,
    }),
  ],
  exports: [
    FontAwesomeModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
  ]
})
export class SharedModule { }
