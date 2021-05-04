import { HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { delay, tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor  {

    constructor(private token: TokenStorageService, public loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
        }
        this.loaderService.isLoading.next(true);

        return next.handle(authReq).pipe(
            delay(0),
            tap(
                () => {
                    this.loaderService.isLoading.next(false);
                }
            ));
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
