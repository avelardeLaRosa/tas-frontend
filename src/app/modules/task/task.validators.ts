import {Injectable} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class TaskValidators {
  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  getFilterForm() {
    return this._formBuilder.group({
      inicio: [''],
      fin: [''],
      statusOp: ['ACTIVE']
    });
  }

  getTaskForm() {
    return this._formBuilder.group({
      descripcion: ['', [Validators.required]],
      fechaInicio: [new Date(), [Validators.required]],
      fechaFin: ['', [Validators.required]],
      user: ['', [Validators.required]]
    });
  }
}
