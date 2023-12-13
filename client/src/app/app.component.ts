import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private spinnerService : NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }
}
