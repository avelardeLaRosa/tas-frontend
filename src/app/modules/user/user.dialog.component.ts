import {Component, EventEmitter, Inject, Injector, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {UserMaster} from "./user.master";
import {UserValidators} from "./user.validators";
import {openSnackBar} from "../../util/snackbar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskOpeComponent} from "../task/ope/task.ope.component";
import {UserModel} from "../../model/user-model";

@Component({
  selector: 'app-user-dialog-component',
  templateUrl: './user.dialog.component.html',
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
      }
    `
  ]
})
export class UserDialogComponent implements OnInit {

  userForm: FormGroup;
  dialogResponse = new EventEmitter();
  cargos: any[] = [
    'BACKEND-DEV.',
    'FRONTEND-DEV.',
    'FULLSTACK-DEV.',
    'ANALISTA QA',
    'SCRUM MASTER',
    'ANALISTA DE DATOS',
  ];

  constructor(
    private _userMaster: UserMaster,
    private _userValidator: UserValidators,
    private _dialogRef: MatDialogRef<TaskOpeComponent>,
    private injector: Injector,
    @Inject(MAT_DIALOG_DATA)
    public _data: {}
  ) {
  }

  ngOnInit(): void {
    this.initPage();
  }

  initPage() {
    this.getValidators();
  }

  campo(val: any) {
    return this.userForm.get(val);
  }

  getValidators() {
    this.userForm = this._userValidator.getUserForm();
  }

  onlyNumberKey(event: any) {
    return event.charCode === 8 || event.charCode === 0 ? null : (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 13;
  }

  addUser() {
    if (this.userForm.invalid) {
      openSnackBar(this._userMaster.snackbar, 'CAMPOS INCOMPLETOS');
      return;
    }

    let user: UserModel = {
      nombre: this.campo('nombre').value,
      apellido: this.campo('apellido').value,
      cargo: this.campo('cargo').value,
      dni: this.campo('dni').value,
      telefono: this.campo('telefono').value
    };

    this._userMaster.add(user).then((res) => {
      if (res) {
        this.dialogResponse.emit(res);
        this._dialogRef.close();
      }
    });
  }

  closeDialog() {
    this._dialogRef.close()
  }
}
