import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router,
              private cookieService: CookieService,) { }

  logout(){
    this.cookieService.remove('token');
    this.router.navigate(['/auth']);

  }
}
