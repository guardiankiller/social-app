import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'form-card-panel',
  templateUrl: './form-card-panel.component.html',
  styleUrls: ['./form-card-panel.component.scss']
})
export class FormCardPanelComponent {

    @Input("formGroup") form: FormGroup = this.fb.group({})
    @Input("title") title: string = "Input Box"

    constructor(public fb: FormBuilder) {}
}
