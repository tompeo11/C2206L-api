import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiUrl = 'https://localhost:5001/api/product';

  constructor(private http: HttpClient)
  {

  }

  ngOnInit(): void
  {
    this.CallApi();
  }
  
  CallApi()
  {
    this.http.get(this.apiUrl).subscribe(response => {
      console.log(response);
    });
  };
}
