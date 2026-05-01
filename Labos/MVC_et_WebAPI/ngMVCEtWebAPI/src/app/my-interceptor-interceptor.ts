import { HttpInterceptorFn } from '@angular/common/http';

export const myInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
        setHeaders:{
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + sessionStorage.getItem("token") // changez la clé si vous avez stocké le token ailleurs
        }
    });
  return next(req);
};
