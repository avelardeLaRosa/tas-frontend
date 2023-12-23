import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {TaskQryComponent} from "./modules/task/qry/task.qry.component";
import {TaskOpeComponent} from "./modules/task/ope/task.ope.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FilterQryComponent} from "./modules/task/qry/filter/filter.qry.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from "@angular/material/select";
import {TableQryComponent} from "./modules/task/qry/table/table.qry.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {UserDialogComponent} from "./modules/user/user.dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {FuseConfirmationDialogComponent} from "./util/dialog/dialog.component";
import {FuseConfirmationService} from "./services/confirmation.service";

@NgModule({
  declarations: [
    AppComponent,
    TaskQryComponent,
    TaskOpeComponent,
    UserDialogComponent,
    TableQryComponent,
    FilterQryComponent,
    FuseConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    FuseConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
