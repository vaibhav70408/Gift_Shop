import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CSRFInterceptor implements HttpInterceptor {
  csrfToken: string | null = null;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const headers = event.headers;
          this.csrfToken = headers.get('x-csrf-token');
          console.log(`HTTP: CSRF token obtained: ${this.csrfToken}`);
        }
      })
    );
  }
}
