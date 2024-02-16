import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { MatRadioModule } from "@angular/material/radio"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatListModule } from "@angular/material/list"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatSelectModule } from '@angular/material/select'

import { MAT_DATE_LOCALE } from '@angular/material/core';

let modules: any[] = [
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule
]

@NgModule({
    imports: modules,
    exports: modules,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class AppMaterialModule {

}