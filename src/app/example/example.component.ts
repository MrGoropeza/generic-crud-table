import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  PercentPipe,
  TitleCasePipe,
} from "@angular/common";
import { Component, Injectable } from "@angular/core";
import { CrudTableComponent } from "../crud-table/crud-table.component";
import { CrudService } from "../crud-table/data-access/crud.service";
import { Column } from "../crud-table/utils/decorators/column.decorator";
import { Table } from "../crud-table/utils/decorators/table.decorator";
import { CrudTableModel } from "../crud-table/utils/models/crud-table.model";

@Component({
  selector: "app-example",
  template: `
    <app-crud-table
      [modelClass]="modelClass"
      [service]="exampleService"
    ></app-crud-table>
  `,
  standalone: true,
  imports: [CommonModule, CrudTableComponent],
})
export class ExampleComponent {
  modelClass = new ExampleModel();
  constructor(protected exampleService: ExampleService) {}
}

// Model
@Table({
  title: "Example",
  singleRecordName: "Example",
  searchPlaceholder: "Buscar por nombre...",
})
export class ExampleModel extends CrudTableModel {
  @Column({ header: "Nombre", editType: "text" }) firstName?: string;

  @Column({ header: "Apellido", editType: "text", pipe: TitleCasePipe })
  lastName?: string;

  @Column({ header: "Email", editType: "text" }) email?: string;

  @Column({
    header: "Fecha de Nacimiento",
    editType: "text",
    pipe: DatePipe,
    pipeArgs: ["dd/MM/yyyy"],
  })
  birthDay?: string;

  @Column({
    header: "Porcentaje",
    editType: "text",
    pipe: PercentPipe,
    pipeArgs: ["1.0-4"],
  })
  percent?: number;

  @Column({
    header: "Precio",
    editType: "text",
    pipe: CurrencyPipe,
    pipeArgs: ["ARS ", "code", "1.0-2"],
  })
  price?: number;
}

// Service
@Injectable({
  providedIn: "root",
})
export class ExampleService extends CrudService<ExampleModel> {
  constructor() {
    super("name");
    this.modelClass = ExampleModel;
  }
}
