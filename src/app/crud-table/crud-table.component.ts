import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { LetModule } from "@ngrx/component";
import { provideComponentStore } from "@ngrx/component-store";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CrudTableStore } from "./data-access/crud-table.store";
import { CrudService } from "./data-access/crud.service";
import { CrudTableBodyComponent } from "./ui/crud-table-body/crud-table-body.component";
import { CrudTableHeaderComponent } from "./ui/crud-table-header/crud-table-header.component";
import { CrudTableModel } from "./utils/models/crud-table.model";
import { DynamicPipe } from "./utils/pipes/dynamic.pipe";

@Component({
  selector: "app-crud-table",
  templateUrl: "./crud-table.component.html",
  styleUrls: ["./crud-table.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    CrudTableHeaderComponent,
    CrudTableBodyComponent,
    DynamicPipe,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    LetModule,
  ],
  providers: [
    provideComponentStore(CrudTableStore),
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class CrudTableComponent<Model extends CrudTableModel>
  implements OnInit
{
  @Input() modelClass!: Model;
  @Input() service!: CrudService<Model>;

  constructor(protected store: CrudTableStore<Model>) {}

  ngOnInit(): void {
    this.store.service = this.service;
    this.store.modelClass = this.modelClass;

    this.store.setState({
      records: [],
      totalRecords: 0,
      rows: 5,
      loading: false,
    });
  }
}
