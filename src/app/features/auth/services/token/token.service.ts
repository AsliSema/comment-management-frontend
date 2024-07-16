import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string){
    localStorage.setItem('token', token);
  }

  get token(){
    return localStorage.getItem('token') as string;
  }

  //deneme

/*   set user(userId: string){
    localStorage.setItem('id', userId);
  }

  get user(){
    return localStorage.getItem('id') as string;
  } */

  clearToken(){
    localStorage.clear();
  }
}
