import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
//import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import {FuseConfirmationConfig} from "../dialog.confirmation";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'fuse-confirmation-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    /* language=SCSS */
    `
      .fuse-confirmation-dialog-panel {
        /* Estilos específicos para pantallas de tamaño medio (md) aquí */
        width: 500px;
      }

      .mat-dialog-container {
        padding: 0 !important;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class FuseConfirmationDialogComponent implements OnInit {
  /**
   * Constructor
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
    public matDialogRef: MatDialogRef<FuseConfirmationDialogComponent>
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

}
