import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable()
export class NoAccountInterceptor implements HttpInterceptor {
    constructor(private router: Router) { };

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Manage to detect when not valid
        return next.handle(request);
    }
}