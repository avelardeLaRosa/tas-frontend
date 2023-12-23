import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter-qry-component',
  templateUrl: './filter.qry.component.html',
})
export class FilterQryComponent implements OnInit {
  @Input() filterForm: FormGroup;
  statusOps: any[] = [
    {value: 'ACTIVO', code: 'ACTIVE'},
    {value: 'INACTIVO', code: 'INACTIVE'},
    {value: 'VENCIDO', code: 'CLOSED'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
