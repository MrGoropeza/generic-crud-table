import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ColumnDefinition } from "../../utils/models/column-options.model";
import { CrudTableModel } from "../../utils/models/crud-table.model";
import { DynamicPipe } from "../../utils/pipes/dynamic.pipe";

@Component({
  selector: "[crud-table-body]",
  template: `
    <td *ngFor="let col of columns">
      <span class="p-column-title">{{ col.header }}</span>

      <ng-container *ngIf="col.pipe">
        {{ row[col.propertyKey] | dynamicPipe : col.pipe : col.pipeArgs }}
      </ng-container>
      <ng-container *ngIf="!col.pipe">
        {{ row[col.propertyKey] }}
      </ng-container>
    </td>

    <td>
      <span class="p-column-title">Acciones</span>

      <div class="align-items-center justify-content-center flex gap-2">
        <button
          pButton
          pRipple
          type="button"
          icon="pi pi-pencil"
          (click)="editRow.emit(row)"
          class="p-button-rounded p-button-info"
        ></button>

        <button
          pButton
          pRipple
          type="button"
          icon="pi pi-trash"
          (click)="deleteRow.emit(row)"
          class="p-button-rounded p-button-danger"
        ></button>
      </div>
    </td>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicPipe, TableModule, ButtonModule],
})
export class CrudTableBodyComponent<Model extends CrudTableModel> {
  @Input() columns: ColumnDefinition[] = [];
  @Input() row!: Model;

  @Output() editRow = new EventEmitter<Model>();
  @Output() deleteRow = new EventEmitter<Model>();
}
