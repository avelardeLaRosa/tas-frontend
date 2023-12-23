import {Injectable} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class UserValidators {
  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  getUserForm() {
    return this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.maxLength(8)]],
      telefono: ['', [Validators.required, Validators.maxLength(9)]]
    });
  }

}
