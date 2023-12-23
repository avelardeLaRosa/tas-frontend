import {Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";
import {ApiResponse, Response} from "../model/ApiResponse";
import {TaskModel} from "../model/task-model";
import {openSnackBar, openSnackBarError} from "../util/snackbar";
import {UserModel} from "../model/user-model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  localService: string = `http://localhost:8080/task-api/user`;
  getSubscription?: Subscription;

  constructor(private _httpClient: HttpClient, private _snackBar: MatSnackBar) {
  }

  get(parameters: HttpParams, _snackBar: MatSnackBar): Promise<ApiResponse<UserModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.get<any>(`${this.localService}`, {params: parameters}).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          openSnackBarError(_snackBar, err.error.messages);
        }
      })
    })
  }

  getById(id: string, _snackBar: MatSnackBar): Promise<ApiResponse<UserModel>> {
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

  add(_user: UserModel, _snackbar: MatSnackBar): Promise<ApiResponse<UserModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.post<any>(`${this.localService}`, _user).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          openSnackBarError(_snackbar, err.error.messages);
        }
      });
    });
  }

  update(_user: UserModel, _snackbar: MatSnackBar): Promise<ApiResponse<UserModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.put<any>(`${this.localService}`, _user).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          openSnackBarError(_snackbar, err.error.message);
        }
      });
    });
  }

  delete(id: string, _snackBar: MatSnackBar): Promise<ApiResponse<UserModel>> {
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
