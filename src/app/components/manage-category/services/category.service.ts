import { Injectable } from '@angular/core';
import {componentDTO} from "../../manage-products/dto/componentDTO";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CookieService} from "ngx-cookie";
import {categoryDTO} from "../dto/categoryDTO";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  addProduct(categorydto: categoryDTO): Observable<any> {
    return this.http.post<any>(this.Url+'/add', {
      product_name:categorydto.category_name,
      model:categorydto.status,

    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }

  getAllProducts(pageIndex: string, pageSize: string): Observable<any> {
    return this.http.get(this.Url+'/getAllComponets/'+pageIndex+'/'+pageSize, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }

  searchProduct(componetID: string| number): Observable<any> {
    return this.http.get(this.Url+'/serach/'+componetID, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }

  deleteProduct(componetID: string| number): Observable<any> {
    return this.http.delete(this.Url+'/delete/'+componetID, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }
}
