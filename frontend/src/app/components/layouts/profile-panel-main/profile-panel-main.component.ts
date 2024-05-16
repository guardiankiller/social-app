import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { UserEditDialogComponent } from '../../dialogs/user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-profile-panel-main',
  templateUrl: './profile-panel-main.component.html',
  styleUrls: ['./profile-panel-main.component.scss']
})
export class ProfilePanelMainComponent {

  @Input() user?: User

  @Input() isCurrentUser = false

  constructor(public matDialog: MatDialog) {}

  onEdit() {
    const ref = this.matDialog.open(UserEditDialogComponent, {data: this.user});
    ref.afterClosed().subscribe(result => console.log("Closed"));
  }
}
