import {Injectable} from "@angular/core";
import {TaskService} from "../../services/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpParams} from "@angular/common/http";
import {openSnackBar} from "../../util/snackbar";
import {TaskModel} from "../../model/task-model";
import {UserService} from "../../services/user.service";

@Injectable({
  providedIn: 'root',
})
export class TaskMaster {
  private _task: any;

  constructor(
    private _taskService: TaskService,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {
  }

  get snackbar() {
    return this._snackBar;
  }

  get task() {
    return this._task;
  }

  set task(value: any) {
    this._task = value;
  }

  get(parameters: HttpParams): Promise<any> {
    return this._taskService.get(parameters, this._snackBar).then((res) => {
      if (!res.exitoso) {
        openSnackBar(this._snackBar, res.messages);
        return null;
      } else {
        return res.data?.pagination;
      }
    });
  }

  getUsers(parameters: HttpParams): Promise<any> {
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
    return this._taskService.getById(id, this._snackBar).then((res) => {
      if (!res.exitoso) {
        openSnackBar(this._snackBar, res.messages);
        return null;
      } else {
        return res.data?.t;
      }
    });
  }

  add(_task: TaskModel): Promise<any> {
    return this._taskService.add(_task, this._snackBar).then((res) => {
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

  update(_task: TaskModel): Promise<any> {
    return this._taskService.update(_task, this._snackBar).then((res) => {
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
    return this._taskService.delete(id, this._snackBar).then((res) => {
      if (!res.exitoso) {
        openSnackBar(this._snackBar, res.messages);
      } else {
        openSnackBar(this._snackBar, 'ELIMINACION EXITOSA');
      }
      return res.data?.t;
    });
  }

  unSub() {
    this._taskService.unSub();
  }

}
