import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewPageComponent } from './image-view-page.component';

describe('ImageViewPageComponent', () => {
  let component: ImageViewPageComponent;
  let fixture: ComponentFixture<ImageViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageViewPageComponent]
    });
    fixture = TestBed.createComponent(ImageViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
