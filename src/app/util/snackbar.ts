import {MatSnackBar} from "@angular/material/snack-bar";

export const openSnackBar = function (
  _snackBar: MatSnackBar,
  message: string,
  type: string = 'mat-primary',
  position: any = 'center',
  duration: number = 6000
) {
  let arrayClass = type.split(' ');
  arrayClass.push('mat-toolbar');
  _snackBar.open(message, 'X', {
    horizontalPosition: position,
    verticalPosition: 'bottom',
    duration: duration,
    panelClass: arrayClass,
  });
  /* 'mat-primary' to 'mat-accent' or 'mat-warn' */
}

export const openSnackBarError = function (
  _snackBar: MatSnackBar,
  _message: string = 'ERROR INTERNO',
) {
  openSnackBar(
    _snackBar,
    _message,
    'mat-warn'
  );
  /* 'mat-primary' to 'mat-accent' or 'mat-warn' */
}
