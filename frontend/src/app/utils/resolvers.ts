import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { ImageView } from "../models/image.view.model";
import { inject } from "@angular/core";
import { ImageServiceService } from "../services/image-service.service";
import { catchError, of } from "rxjs";
import { HttpServerError } from "./errors";
import { User } from "../models/user.model";
import { UserInfoService } from "../services/user-info.service";

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

export const resloveUserView: ResolveFn<User> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    let username = route.paramMap.get("username")!;
    let router = inject(Router);
    return inject(UserInfoService)
    .loadUserInfo(username)
    .pipe(catchError((err: HttpServerError) => {
        router.navigateByUrl('/error', { state: { status: err.status, statusText: err.statusText, message: err.message }});
        console.log("Error "+err.message);
        console.log("Error "+err.status);
        return of();
    }));
}