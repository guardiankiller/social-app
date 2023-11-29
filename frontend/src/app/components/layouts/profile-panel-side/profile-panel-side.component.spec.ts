import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePanelSideComponent } from './profile-panel-side.component';

describe('ProfilePanelSideComponent', () => {
  let component: ProfilePanelSideComponent;
  let fixture: ComponentFixture<ProfilePanelSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePanelSideComponent]
    });
    fixture = TestBed.createComponent(ProfilePanelSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
