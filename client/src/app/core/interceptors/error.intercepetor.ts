import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    message:any;
    constructor(private route:Router, private toast:ToastrService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError(error=>{
            if(error){
                if(error.status===400){
                    if(error.error.errors){
                        throw error.error;
                    }else{
                        this.toast.error(error.error.message, error.error.statusCode)
                    }
                }
                if(error.statusCode===401){
                    this.toast.error(error.error.message, error.error.statusCode)
                }
                if(error.status===500){
                    const navigatingExtras: NavigationExtras={state:{error:error.error, message:error.message}}
                    this.route.navigateByUrl('/server-error',navigatingExtras);
                }
                if(error.status===404){
                    this.route.navigateByUrl('/not-found');
                }
            }
            return throwError(error);
        })

      )
    }

}