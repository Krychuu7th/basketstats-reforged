import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    // private nbToastrService: NbToastrService,
    private zone: NgZone,
    private router: Router
  ) {}

  handleError(error: Error) {

    this.zone.run(() => {
      this.router.navigate(['/']);
      console.log(error);
      this.showToast(error.message,
        'Coś poszło nie tak!',
        'danger',
        true,
        'bottom-end',
        6000);
      }
    );
  }

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }
}
