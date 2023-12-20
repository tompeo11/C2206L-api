import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl;
  validationError: any;

  constructor(private http : HttpClient) {}

  get404Error(){
    this.http.get(this.baseUrl + '/buggy/endpointdoesnotexist').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
  }

  get500Error(){
    this.http.get(this.baseUrl + '/buggy/servererror').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
  }

  get400Error(){
    this.http.get(this.baseUrl + '/buggy/badrequest').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    }); 
  }

  get404ValidationError(){
    this.http.get(this.baseUrl + '/buggy/badrequest/onehundred').subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        console.log(err);
        this.validationError = err.errors;
      }
    });
  }
}
