import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthorizationService } from "../services/authorization.service";


@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
    constructor(private auth: AuthorizationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const API_URL = "http://localhost:3000";
        let finalReq: HttpRequest<any> | null = null;
        if (req.url.startsWith('http') || req.url.includes('/assets/')) {
            finalReq = req;
        } else {
            if(!req.url.includes("/login") && !req.url.includes("/register")) {
                finalReq = req.clone({
                    setHeaders: {Authorization: `Bearer ${this.auth.user.authorization.jwt}`},
                    url: `${API_URL}${req.url}`
                })
            } else {
                finalReq = req.clone({
                    url: `${API_URL}${req.url}`
                })
            }
        }
        return next.handle(finalReq);
    }
}
