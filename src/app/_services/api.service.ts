
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Link } from '../_models/link';
import { HttpClient } from '@angular/common/http';
import { urlRequestDTO } from '../_models/urlRequestDTO';
import { map } from 'rxjs';
import { Data } from '../_models/data';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl: String = environment.apiUrl;
  link: Link | undefined;
  request: urlRequestDTO = { UrlOriginal: ''};

  encurtarLink(linkOriginal: String){

    this.request.UrlOriginal = linkOriginal;

    return this.http.post<Data<Link>>(this.baseUrl + '/encurtar', this.request)
    .pipe(
      map((res: Data<Link>) => {
        return res;
      })
    );
  }
}
