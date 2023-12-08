import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent {
  @Input() pageSize = 3;
  @Input() totalCount = 0;

  @Output() pageNumber = new EventEmitter<number>();

  onPagerChanged(event: any){
    this.pageNumber.emit(event.page);
  }
}
