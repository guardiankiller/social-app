import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-panel-side',
  templateUrl: './profile-panel-side.component.html',
  styleUrls: ['./profile-panel-side.component.scss']
})
export class ProfilePanelSideComponent {
  @Input() user?: User
}
