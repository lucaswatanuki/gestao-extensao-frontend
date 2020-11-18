import { SpinnerService } from './../../shared/spinner/spinner.service';
import { HttpErrorResponse, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService} from './token-storage.service';
import { tap } from 'rxjs/operators';
 
const TOKEN_HEADER_KEY = 'jwt';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(private token: TokenStorageService, private spinnerService: SpinnerService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
        }
        this.spinnerService.requestStarted();
        return next.handle(authReq);
    }

    handler(next, request) {
        return next.handle(request).pipe(
            tap(
                (event) => {
                    if(event instanceof HttpResponse){
                        this.spinnerService.requestEnded();
                    }

                },
                (error: HttpErrorResponse) => {
                    this.spinnerService.resetSpinner();
                    throw error;
                }
            )
        );
    }
}
 
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];