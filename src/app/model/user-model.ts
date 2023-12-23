import {TaskModel} from "./task-model";

export class UserModel {
  id?: string;
  nombre?: string;
  apellido?: string;
  cargo?: string;
  dni?: string;
  telefono?: string;
  taskDTOS?: TaskModel[];

  constructor(id: string, nombre: string, apellido: string, cargo: string, dni: string, telefono: string) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cargo = cargo;
    this.dni = dni;
    this.telefono = telefono;
  }
}
