import {UserModel} from "./user-model";

export class TaskModel {
  id?: string;
  statusOperation?: string;
  taskCode?: string;
  descripcion?: string;
  fechaInicio?: string;
  fechaFin?: string;
  userDTO?: UserModel;

  index?: number;
  actions?: any[];

  constructor(
    id?: string,
    statusOperation?: string,
    taskCode?: string,
    descripcion?: string,
    fechaInicio?: string,
    fechaFin?: string) {
    this.id = id;
    this.statusOperation = statusOperation;
    this.taskCode = taskCode;
    this.descripcion = descripcion;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}
