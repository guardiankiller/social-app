import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-panel-main',
  templateUrl: './profile-panel-main.component.html',
  styleUrls: ['./profile-panel-main.component.scss']
})
export class ProfilePanelMainComponent {

  @Input() user?: User

  @Input() isCurrentUser = false
}
