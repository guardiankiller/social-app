import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Image } from '../models/image.model';
import { Observable, catchError, map, of, switchMap, zip } from 'rxjs';
import { Page } from '../models/page.model';
import { ImageView } from '../models/image.view.model';
import { makeError } from '../utils/errors';
import { UserInfoService } from './user-info.service';

type NextPrev = {
  next: string | undefined, 
  prev: string | undefined 
}

type ImageAndBlobURL = {
  imageInfo: Image
  blobURL: string
}

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient, private userInfo: UserInfoService) { }

  public getImageView(username: string, imageId: number): Observable<ImageView> {
    return zip(
      this.getImageInfo(imageId, username),
      this.getNextAndPrev(imageId, username),
      this.userInfo.getUserInfoBasic(username),
    ).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error);
      throw makeError(error);
    }), map(([image, nextPrev, userInfo]) => ({
        imageinfo: image.imageInfo, 
        imageURL: image.blobURL, 
        prev: nextPrev.prev,
        next: nextPrev.next,
        userInfo
      } as ImageView)));
  }

  private getImageInfo(imageId: number, username: string): Observable<ImageAndBlobURL> {
    return this.http
    .get<Image>(`/api/users/${username}/images/${imageId}`)
    .pipe(switchMap(image => 
      this.http.get(image.url, { responseType: 'blob' }).pipe(map(blob => ({
        imageInfo: image,
        blobURL: URL.createObjectURL(blob)
      } as ImageAndBlobURL)))
    ))
  }

  private getNextAndPrev(imageId: number, username: string): Observable<NextPrev> {
    return this.http
    .get<Page<Image>>(`/api/users/${username}/images?pageSize=9999&profileImage=false`)
    .pipe(map(page => this.processNextAndPrev(page, imageId, username)));
  }

  private processNextAndPrev(page: Page<Image>, imageId: number, username: string): NextPrev {
    console.log("Get all images: "+JSON.stringify(page));
    let current = page.content.find(i=>i.id == imageId);
    let prevRoute: string | undefined;
    let nextRoute: string | undefined;
    if(current != undefined) {
      let nextIndex = page.content.indexOf(current) + 1;
      let prevIndex = page.content.indexOf(current) - 1;
      if(nextIndex < page.content.length) {
        nextRoute = `/users/${username}/images/${page.content[nextIndex].id}`
      }
      if(prevIndex >= 0) {
        prevRoute = `/users/${username}/images/${page.content[prevIndex].id}`
      }
    }
    return {
      next: nextRoute,
      prev: prevRoute
    };
  }
}
