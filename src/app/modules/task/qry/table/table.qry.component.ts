import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {TaskModel} from "../../../../model/task-model";
import {Router} from "@angular/router";
import {openConfirmationDialog} from "../../../../util/alert";
import {FuseConfirmationService} from "../../../../services/confirmation.service";
import {TaskMaster} from "../../task.master";
import {Pagination} from "../../../../model/ApiResponse";

@Component({
  selector: 'app-table-qry-component',
  templateUrl: './table.qry.component.html',
})
export class TableQryComponent implements OnInit, OnChanges {
  @Input() taskList: Pagination<TaskModel>;
  @Output() _data: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  @Output() _dataDelete: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  @Output() _pageEvent: EventEmitter<any> = new EventEmitter<any>();
  taskTableList: TaskModel[] = [];
  displayedColumns: string[] = ['id', 'statusOp', 'code', 'descripcion', 'vigencia', 'actions'];
  dataSource = new MatTableDataSource<TaskModel>(this.taskTableList);

  constructor(
    private _taskMaster: TaskMaster
  ) {
  }

  ngOnInit(): void {
    this.initPage();
  }


  initPage() {

  }

  buildTaskList(taskList: TaskModel[]) {
    this.taskTableList = taskList.map((t) => {
      const data = new TaskModel();
      data.id = t.id;
      data.taskCode = t.taskCode;
      data.statusOperation = t.statusOperation;
      data.descripcion = t.descripcion;
      data.fechaInicio = t.fechaInicio;
      data.fechaFin = t.fechaFin;
      data.userDTO = t.userDTO;
      data.actions = [
        {
          type: 'mat-icon-button',
          class: 'mat-focus-indicator mat-icon-button mat-button-base',
          classIcon: 'icon-size-4',
          icon: 'edit',
          action: () => this.updateTaks(data),
          tooltip: 'Editar',
          disabled: false,
          shown: true
        },
        {
          type: 'mat-icon-button',
          class: 'mat-focus-indicator mat-icon-button mat-button-base',
          classIcon: 'icon-size-4',
          icon: 'delete_outline',
          action: () => this.deleteTask(data),
          tooltip: 'Eliminar',
          disabled: false,
          shown: true
        }
      ]
      return data;
    });

    this.dataSource.data = [...this.taskTableList];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES: ', changes);
    let response: Pagination<TaskModel> = changes["taskList"].currentValue;
    if (response) {
      console.log('list: ', response);
      this.buildTaskList(response.list);
    }

  }

  updateTaks(data: TaskModel) {
    this._data.emit(data);
  }

  deleteTask(data: TaskModel) {
    this._dataDelete.emit(data);
  }

  getPaginationEvent(event: any) {
    this._pageEvent.emit(event);
  }

  getStatusFormat(element: TaskModel) {
    switch (element.statusOperation) {
      case 'ACTIVE':
        return {label: 'ACTIVO', class: 'text-green-800 bg-green-200'};
      case 'INACTIVE':
        return {label: 'INACTIVO', class: 'text-yellow-800 bg-yellow-200'};
      case 'CLOSED':
        return {label: 'VENCIDO', class: 'text-red-800 bg-red-200'};
      default:
        return {label: 'SIN ESTADO', class: 'text-gray-800 bg-gray-200'};
    }
  }
}
