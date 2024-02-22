import { Component, Input, OnInit, Signal, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ImageView } from 'src/app/models/image.view.model';

@Component({
  selector: 'app-image-view-page',
  templateUrl: './image-view-page.component.html',
  styleUrls: ['./image-view-page.component.scss']
})
export class ImageViewPageComponent {

  imageURL = computed(() => this.viewModel().imageURL);

  error: WritableSignal<string | null> = signal(null);

  viewModel!: WritableSignal<ImageView>;

  hasError = computed(() => this.error() != null);

  nextImageURL = computed(() => this.viewModel().next);
  prevImageURL = computed(() => this.viewModel().prev);
  hasNext = computed(() => this.nextImageURL());
  hasPrev = computed(() => this.prevImageURL());

  constructor(
    activatedRoute: ActivatedRoute,
    bar: MatSnackBar) {
      activatedRoute.data.subscribe(data => {
       let view = data['result'] as ImageView
          console.log(view);
          if(this.viewModel == undefined) {
            this.viewModel = signal(view);
          }
          console.log(JSON.stringify(view));
          this.viewModel.set(view);
          if(view.error != null) {
            this.error.set(view.error);
            bar.open(view.error, 'OK');
          }
      })
  }
}
