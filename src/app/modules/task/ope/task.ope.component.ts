import {Component, OnInit} from "@angular/core";
import {TaskMaster} from "../task.master";
import {TaskValidators} from "../task.validators";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {UserModel} from "../../../model/user-model";
import {debounceTime, distinctUntilChanged, interval, take} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {UserDialogComponent} from "../../user/user.dialog.component";
import {TaskModel} from "../../../model/task-model";
import * as moment from 'moment';

@Component({
  selector: 'app-task-ope-component',
  templateUrl: './task.ope.component.html',
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
      }
    `
  ]
})
export class TaskOpeComponent implements OnInit {
  taskForm: FormGroup;
  minDate = new Date();
  minFinDate: Date;
  taskObj: TaskModel;
  userList: UserModel[] = [];
  userObj: UserModel;
  updateFlag: boolean = false;
  title: string;

  constructor(
    private _dialog: MatDialog,
    private _taskMaster: TaskMaster,
    private _taskValidators: TaskValidators,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.initPage();
  }

  initPage() {
    this.getValidators();
    this.getData();
    this.getMaster();

  }

  goToList() {
    this.router.navigate(['']);
  }

  addTask() {
    console.log('fecha: ', this.campo('fechaInicio').value);
    let task: TaskModel = {
      descripcion: this.campo('descripcion').value,
      fechaInicio: moment(this.campo('fechaInicio').value).format('YYYY/MM/DD'),
      fechaFin: moment(this.campo('fechaFin').value).format('YYYY/MM/DD'),
      userDTO: this.userObj
    }

    if (this.updateFlag) {
      task.id = this.taskObj.id;
      this._taskMaster.update(task).then((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    } else {
      this._taskMaster.add(task).then((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    }

  }


  getValidators() {
    this.taskForm = this._taskValidators.getTaskForm();
  }

  campo(val: any) {
    return this.taskForm.get(val);
  }


  async getMaster() {
    await this.getUsers();
  }

  async getUsers() {
    const intervalObservable = this.campo('user').valueChanges;

    await intervalObservable.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((filterValue) => {

        let params = new HttpParams()
          .set('page', '0')
          .set('size', '10')
          .set('filter', filterValue);

        return this._taskMaster.getUsers(params);

      })
    ).subscribe((response) => {
      if (response) {
        this.userList = response.list;
      }
    })
  }

  autoCompleteValue(user: UserModel) {
    this.userObj = user;
    console.log('OBJ USER: ', this.userObj);
    return (user.nombre + ' ' + user.apellido + ' - ' + user.cargo).toUpperCase();
  }

  openUserDialog() {
    const dialogRef = this._dialog.open(UserDialogComponent, {
      data: {},
      maxHeight: 'calc(100vh-50px)',
      height: 'auto',
      width: '500px'
    });

    dialogRef.componentInstance.dialogResponse.subscribe(
      (response) => {
        this.userObj = response;
        console.log('OBJ USER: ', this.userObj);
        this.campo('user').setValue((response.nombre + ' ' + response.apellido + ' - ' + response.cargo).toUpperCase());
      }
    )
  }

  getData() {
    if (this._activatedRoute.snapshot.params['id']) {
      this.updateFlag = true;
      let taskID = this._activatedRoute.snapshot.params['id'];
      const parameter = this._taskMaster.task;
      if (parameter) {
        this.taskObj = parameter;
        this.setData(parameter);
      } else {
        this._taskMaster.getById(taskID).then((res) => {
          if (res) {
            this.taskObj = res;
            this.setData(res);
          }
        })
      }
    }
    this.title = this.updateFlag ? 'Actulizar Tarea' : 'Registrar Tarea';
  }

  setData(parameter: any) {
    console.log('data: ', parameter);
    this.campo('descripcion').setValue(parameter.descripcion);
    this.campo('fechaInicio').setValue(moment(parameter.fechaInicio, 'YYYY/MM/DD').toDate());
    this.campo('fechaFin').setValue(moment(parameter.fechaFin, 'YYYY/MM/DD').toDate());
    this.campo('user').setValue(this.autoCompleteValue(parameter.userDTO));
  }
}
