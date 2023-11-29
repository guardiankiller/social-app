import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePanelMainComponent } from './profile-panel-main.component';

describe('ProfilePanelMainComponent', () => {
  let component: ProfilePanelMainComponent;
  let fixture: ComponentFixture<ProfilePanelMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePanelMainComponent]
    });
    fixture = TestBed.createComponent(ProfilePanelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
