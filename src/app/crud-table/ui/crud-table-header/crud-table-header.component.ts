import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TableModule } from "primeng/table";
import { ColumnDefinition } from "../../utils/models/column-options.model";

@Component({
  selector: "[crud-table-headers]",
  template: `
    <th
      *ngFor="let col of columns"
      [pSortableColumn]="col.propertyKey"
      [pSortableColumnDisabled]="!col.sortable"
    >
      <div class="flex items-center justify-between">
        {{ col.header }}
        <p-sortIcon *ngIf="col.sortable" [field]="col.propertyKey"></p-sortIcon>
        <!-- <p-columnFilter
          type="text"
          [field]="col.propertyKey"
          display="menu"
          style="margin-left: auto"
        ></p-columnFilter> -->
      </div>
    </th>
    <th style="width: 138px;">Acciones</th>
  `,
  standalone: true,
  imports: [CommonModule, TableModule],
})
export class CrudTableHeaderComponent {
  @Input() columns: ColumnDefinition[] = [];
}
