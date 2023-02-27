import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
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
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class CrudTableComponent<Model extends CrudTableModel>
  implements OnInit
{
  @Input() modelClass!: Model;
  @Input() values: Model[] = [];

  protected filters: string[] = [];

  private setFilters() {
    this.filters = this.modelClass
      .getColumnsDefinitions()
      .map((col) => col.propertyKey);
  }

  ngOnInit(): void {
    this.setFilters();
  }
}
