import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { ImageView } from "../models/image.view.model";
import { inject } from "@angular/core";
import { ImageServiceService } from "../services/image-service.service";
import { catchError, of } from "rxjs";
import { HttpServerError } from "./errors";

export const resloveImageView: ResolveFn<ImageView> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    let username = route.paramMap.get("username")!;
    let imageId = Number.parseInt(route.paramMap.get("imageId")!);
    let router = inject(Router);
    return inject(ImageServiceService)
    .getImageView(username, imageId)
    .pipe(catchError((err: HttpServerError) => {
        router.navigateByUrl('/error', { state: { status: err.status, statusText: err.statusText, message: err.message }});
        console.log("Error "+err.message);
        console.log("Error "+err.status);
        return of({error: err.message, imageURL: '../../../../assets/profile.jpg'} as ImageView);
    }));
}