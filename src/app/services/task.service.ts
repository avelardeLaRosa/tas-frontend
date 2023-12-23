import {Injectable} from "@angular/core";
import {Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskModel} from "../model/task-model";
import {ApiResponse} from "../model/ApiResponse";
import {openSnackBar, openSnackBarError} from "../util/snackbar";

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  localService: string = `http://localhost:8080/task-api/task`;
  getSubscription?: Subscription;

  constructor(private _httpClient: HttpClient, private _snackBar: MatSnackBar) {
  }

  get(parameters: HttpParams, _snackBar: MatSnackBar): Promise<ApiResponse<TaskModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.get<any>(`${this.localService}`, {params: parameters}).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          openSnackBarError(_snackBar, err.error.messages);
        }
      });
    });
  }

  getById(id: string, _snackBar: MatSnackBar): Promise<ApiResponse<TaskModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.get<any>(`${this.localService}/${id}`).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          openSnackBarError(_snackBar, err.error.messages);
        }
      })
    })
  }

  add(_task: TaskModel, _snackbar: MatSnackBar): Promise<ApiResponse<TaskModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.post<any>(`${this.localService}`, _task).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          openSnackBarError(_snackbar, err.error.messages);
        }
      });
    });
  }

  update(_task: TaskModel, _snackbar: MatSnackBar): Promise<ApiResponse<TaskModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.put<any>(`${this.localService}`, _task).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          openSnackBarError(_snackbar, err.error.messages);
        }
      });
    });
  }

  delete(id: string, _snackBar: MatSnackBar): Promise<ApiResponse<TaskModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.delete<any>(`${this.localService}/${id}`).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          openSnackBarError(_snackBar, err.error.messages);
        }
      })
    })
  }

  unSub() {
    this.getSubscription.unsubscribe();
  }

}
