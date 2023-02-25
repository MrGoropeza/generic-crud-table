import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { CrudTableModel } from "./utils/crud-table.model";
import { DynamicPipe } from "./utils/pipes/dynamic.pipe";

@Component({
  selector: "app-crud-table",
  templateUrl: "./crud-table.component.html",
  styleUrls: ["./crud-table.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    DynamicPipe,
    TableModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
  ],
})
export class CrudTableComponent<Model extends CrudTableModel>
  implements OnInit
{
  @Input() modelClass!: Model;
  @Input() values: Model[] = [];

  ngOnInit(): void {
    // console.log(this.modelClass.getColumnsDefinitions());
  }
}
