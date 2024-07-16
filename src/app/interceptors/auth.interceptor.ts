import { HttpInterceptorFn } from "@angular/common/http";
import { TokenService } from "../features/auth/services/token/token.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const tokenService = inject(TokenService);
  
    if(tokenService.token){
      let newRequest = req.clone({ setHeaders: { Authorization: 'Bearer ' +  tokenService.token }});
  
      return next(newRequest);
    }
  
    return next(req)
  
  
  };