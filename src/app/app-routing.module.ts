import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskQryComponent} from "./modules/task/qry/task.qry.component";
import {TaskOpeComponent} from "./modules/task/ope/task.ope.component";

const routes: Routes = [
  {
    path: '',
    component: TaskQryComponent
  },
  {
    path: 'add',
    component: TaskOpeComponent
  },
  {
    path: 'update/:id',
    component: TaskOpeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
