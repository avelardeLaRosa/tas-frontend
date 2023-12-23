import {Injectable} from "@angular/core";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpParams} from "@angular/common/http";
import {openSnackBar} from "../../util/snackbar";
import {TaskModel} from "../../model/task-model";
import {UserModel} from "../../model/user-model";

@Injectable({
  providedIn: 'root',
})
export class UserMaster {
  private _user: any;

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {
  }

  get snackbar() {
    return this._snackBar;
  }

  get user() {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
  }

  get(parameters: HttpParams): Promise<any> {
    return this._userService.get(parameters, this._snackBar).then((res) => {
      if (!res.exitoso) {
        openSnackBar(this._snackBar, res.messages);
        return null;
      } else {
        return res.data?.pagination;
      }
    });
  }


  getById(id: string): Promise<any> {
    return this._userService.getById(id, this._snackBar).then((res) => {
      if (!res.exitoso) {
        openSnackBar(this._snackBar, res.messages);
        return null;
      } else {
        return res.data?.t;
      }
    });
  }

  add(_user: UserModel): Promise<any> {
    return this._userService.add(_user, this._snackBar).then((res) => {
      if (!res.exitoso) {
        openSnackBar(this._snackBar, res.messages);
        return null;
      } else {
        return res.data?.t;
      }
    }).catch((err) => {
      openSnackBar(this._snackBar, err);
    })
  }

  update(_user: UserModel): Promise<any> {
    return this._userService.update(_user, this._snackBar).then((res) => {
      if (!res.exitoso) {
        openSnackBar(this._snackBar, res.messages);
        return null;
      } else {
        return res.data?.t;
      }
    }).catch((err) => {
      openSnackBar(this._snackBar, err);
    })
  }

  delete(id: string): Promise<any> {
    return this._userService.delete(id, this._snackBar).then((res) => {
      if (!res.exitoso) {
        openSnackBar(this._snackBar, res.messages);
      } else {
        openSnackBar(this._snackBar, 'ELIMINACION EXITOSA');
      }
      return res.data?.t;
    });
  }

  unSub() {
    this._userService.unSub();
  }

}
