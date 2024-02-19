import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServerError } from 'src/app/utils/errors';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {

  errorMessage = "Server Error"
  errorType = "Not Found"
  errorCode = 404

  constructor(activatedRoute: ActivatedRoute,
    router: Router) {
    
    activatedRoute.paramMap .subscribe( data => {
      this.errorType = history.state.statusText
      this.errorCode = history.state.status
      this.errorMessage = history.state.message
    })
  }
}
