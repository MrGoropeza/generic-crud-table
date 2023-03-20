import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  PercentPipe,
  TitleCasePipe,
} from "@angular/common";
import { Component, Injectable } from "@angular/core";
import {
  Column,
  CrudService,
  CrudTableComponent,
  CrudTableModel,
  Label,
  MultipleRecordsResponse,
  Search,
  Table,
} from "ngx-generic-crud-table";
import { Observable, of } from "rxjs";

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
  @Label()
  @Search()
  @Column({ header: "Nombre", editType: "text" })
  firstName?: string;

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
    super();
    this.modelClass = ExampleModel;

    this.exampleValue.firstName = "Nombre";
    this.exampleValue.lastName = "Apellido";
    this.exampleValue.email = "correo@org.com";
    this.exampleValue.birthDay = new Date(Date.now()).toISOString();
    this.exampleValue.percent = 0.5;
    this.exampleValue.price = 1000;
  }

  private exampleValue = new ExampleModel();

  override list(
    page?: number,
    perPage?: number,
    sort?: string,
    filter?: string
  ): Observable<MultipleRecordsResponse<ExampleModel>> {
    return of<MultipleRecordsResponse<ExampleModel>>({
      items: Array(15).fill(this.exampleValue, 0),
      totalItems: 15,
    } as MultipleRecordsResponse<ExampleModel>);
  }
}
