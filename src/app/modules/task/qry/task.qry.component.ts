import {Component, OnInit, ViewChild} from "@angular/core";
import {TaskMaster} from "../task.master";
import {FilterQryComponent} from "./filter/filter.qry.component";
import {TaskValidators} from "../task.validators";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {TaskModel} from "../../../model/task-model";
import {HttpParams} from "@angular/common/http";
import * as moment from 'moment';
import {FuseConfirmationService} from "../../../services/confirmation.service";
import {openConfirmationDialog} from "../../../util/alert";
import {Pagination, Response} from "../../../model/ApiResponse";

@Component({
  selector: 'app-task-qry-component',
  templateUrl: './task.qry.component.html',
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
      }
    `
  ]
})
export class TaskQryComponent implements OnInit {
  @ViewChild('filter') filterComponent: FilterQryComponent;
  filterForm: FormGroup;
  taskList: Pagination<TaskModel>;

  constructor(
    private _taskMaster: TaskMaster,
    private _taskValidators: TaskValidators,
    private router: Router,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.initPage();
  }

  initPage() {
    this.getValidator();
    this.getTaskMaster();
  }

  getValidator() {
    this.filterForm = this._taskValidators.getFilterForm();
  }

  campo(val: any) {
    return this.filterForm.get(val);
  }

  clearInputs() {
    this.campo('inicio').reset();
    this.campo('fin').reset();
    this.campo('statusOp').reset('ACTIVE');
  }

  goToRegister() {
    this.router.navigate(['add']);
  }

  goToUpdate(_data: TaskModel) {
    this.router.navigate(['update', _data.id]);
    this._taskMaster.task = _data;
  }

  getPaginationEvent(event: any) {
    console.log('EVENT PAG: ', event);
    let params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize);
    this.getTaskMaster(params);
  }

  deleteTask(_data: TaskModel) {
    openConfirmationDialog({
      fuseConfirmationService: this._fuseConfirmationService,
      action: () => {
        this._taskMaster.delete(_data.id).then((response) => {
          if (response) {
            let params = new HttpParams();
            this._taskMaster.get(params).then(response => response ? this.taskList = response : this.taskList = null);
          }
        })
      }
    })
  }

  getTaskFilter() {
    let fInicio: string;
    let fFin: string;
    let statusOP: string;

    if (this.campo('statusOp')?.value) {
      statusOP = this.campo('statusOp')?.value;
    } else {
      statusOP = '';
    }

    if (this.campo('inicio')?.value) {
      fInicio = moment(this.campo('inicio')?.value).format('YYYY/MM/DD');
    } else {
      fInicio = '';
    }

    if (this.campo('fin')?.value) {
      fFin = moment(this.campo('fin')?.value).format('YYYY/MM/DD');
    } else {
      fFin = '';
    }
    let params = new HttpParams()
      .set('page', '0')
      .set('size', '10')
      .set('fechaInicio', fInicio)
      .set('fechaFin', fFin)
      .set('statusOp', statusOP);

    console.log('PARAMS: ', params)
    this.getTaskMaster(params);
  }

  getTaskMaster(params?: HttpParams) {

    this._taskMaster.get(params).then((res) => {
      if (res) {
        this.taskList = res;
      } else {
        this.taskList = null;
      }
    })
  }


}
