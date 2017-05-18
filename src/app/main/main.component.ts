import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-baloo',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  token = {access_token: '', expires_in: ''};
  isFetched = false;
  store: object = {name: '', is_closed: null};

  private static getCredentialsForToken() {
    const formData = new FormData();
    formData.append('client_id', 'client_id');
    formData.append('client_secret', 'client_secret');
    return formData;
  }

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('token'));

    if (this.token === null || +this.token.expires_in < 100) {
      const body = MainComponent.getCredentialsForToken();

      this.http.post('/oauth2/token', body).subscribe(
        successData => {
          this.token = {
            access_token: `${successData.json().token_type} ${successData.json().access_token}`,
            expires_in: successData.json().expires_in,
          };

          this.fetchIcaSupermarketMajorna();

          localStorage.setItem('token', JSON.stringify(this.token));
        },
        errorData => console.log('errorData:', errorData)
      );
    } else {
      this.fetchIcaSupermarketMajorna();
    }
  }

  private fetchIcaSupermarketMajorna() {
    const headers = new Headers();
    headers.append('Authorization', this.token.access_token);
    const requestOptions = new RequestOptions({headers});

    this.http.get('/v3/businesses/ica-supermarket-majorna-göteborg', requestOptions).subscribe(
      successData => {
        this.store = successData.json();
        this.isFetched = true;
      },
      errorData => console.log('errorData:', errorData)
    );
  }

}
