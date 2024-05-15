import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-card-panel',
  templateUrl: './form-card-panel.component.html',
  styleUrls: ['./form-card-panel.component.scss']
})
export class FormCardPanelComponent {

    @Input("formGroup") form: FormGroup = new FormGroup({})
    @Input("title") title: string = "Input Box"
}
