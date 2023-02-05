import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Observable, throwError } from "rxjs";
import { catchError, filter, mergeMap } from "rxjs/operators";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.isAuthenticated$
      .pipe(
        mergeMap((isAuthenticated) => {
          if (isAuthenticated) {
            return this.authService.getAccessTokenSilently().pipe(
              filter(token => typeof token === 'string'),
              mergeMap(token => {
                const tokenReq = request.clone({
                  setHeaders: { Authorization: `Bearer ${token}` }
                });
                return next.handle(tokenReq);
              }),
              catchError(err => throwError(err))
            );
          }

          return next.handle(request);
        })
      );
  }
}
