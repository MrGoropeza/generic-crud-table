import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TableModule } from "primeng/table";
import { ColumnDefinition } from "../../utils/models/column-options.model";

@Component({
  selector: "[crud-table-headers]",
  templateUrl: "./crud-table-header.component.html",
  styleUrls: ["./crud-table-header.component.scss"],
  standalone: true,
  imports: [CommonModule, TableModule],
})
export class CrudTableHeaderComponent {
  @Input() columns: ColumnDefinition[] = [];
}
