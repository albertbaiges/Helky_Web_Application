import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL, BEARER_TOKEN } from "../shared/toRemove";


@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        let finalReq: HttpRequest<any> | null = null;
        if (req.url.startsWith('http') || req.url.includes('/assets/')) {
            finalReq = req;
        } else {
            finalReq = req.clone({
                setHeaders: {Authorization: BEARER_TOKEN},
                url: `${API_URL}${req.url}`
            })
        }
        console.log("intercepted...")
        return next.handle(finalReq);
    }
}
