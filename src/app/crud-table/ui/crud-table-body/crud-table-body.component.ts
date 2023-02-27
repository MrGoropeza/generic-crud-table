import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ColumnDefinition } from "../../utils/models/column-options.model";
import { DynamicPipe } from "../../utils/pipes/dynamic.pipe";

@Component({
  selector: "[crud-table-body]",
  standalone: true,
  imports: [CommonModule, DynamicPipe],
  templateUrl: "./crud-table-body.component.html",
  styleUrls: ["./crud-table-body.component.scss"],
})
export class CrudTableBodyComponent {
  @Input() columns: ColumnDefinition[] = [];
  @Input() row!: any;
}
