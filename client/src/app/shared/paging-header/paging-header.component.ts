import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.css']
})
export class PagingHeaderComponent {
  @Input() pageNumber = 1;
  @Input() pageSize = 3;
  @Input() totalCount = 0;
}
