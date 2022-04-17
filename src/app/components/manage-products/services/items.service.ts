import { Injectable } from '@angular/core';
import {componentDTO} from "../dto/componentDTO";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {environment} from "../../../../environments/environment";
import {ModelDTO} from "../dto/ModelDTO";
import {ImgDTO} from "../dto/ImgDTO";
import {updateDTO} from "../dto/updateDTO";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  addProduct(componentdto: componentDTO): Observable<any> {
    return this.http.post<any>(this.Url+'/add', {
      product_name:componentdto.product_name,
      description:componentdto.description,
      details:componentdto.details,
      pan_size:componentdto.pan_size,
      dimension:componentdto.dimension,
      netweight:componentdto.netweight,
      power_supply:componentdto.power_supply,
      status:componentdto.status,
      category_name:componentdto.category_name
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
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

  addModel(modelDTO: ModelDTO): Observable<any> {
    return this.http.post<any>(this.Url+'/model/add', {
      model_name:modelDTO.model_name,
      capacity:modelDTO.capacity,
      readability:modelDTO.readability,
      calibration_weight:modelDTO.calibration_weight,
      product_name:modelDTO.product_name,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  addImg(imgDTO: ImgDTO): Observable<any> {
    return this.http.post<any>(this.Url+'/img/add', {
      image_path:imgDTO.image_path,
      product_name:imgDTO.product_name,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  updateComponents(updateDTO: updateDTO): Observable<any> {
    return this.http.post(this.Url+'/update', {
      product_name: updateDTO.product_name,
      description: updateDTO.description,
      image_path: updateDTO.image_path,
      pan_size: updateDTO.pan_size,
      dimension: updateDTO.dimension,
      netweight: updateDTO.netweight,
      power_supply: updateDTO.power_supply,
      status: updateDTO.status,
      category_name: updateDTO.category_name,
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }
}
