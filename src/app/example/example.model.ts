import {
  CurrencyPipe,
  DatePipe,
  PercentPipe,
  TitleCasePipe,
} from "@angular/common";
import { Column } from "../crud-table/utils/decorators/column.decorator";
import { Table } from "../crud-table/utils/decorators/table.decorator";
import { CrudTableModel } from "../crud-table/utils/models/crud-table.model";

@Table({ title: "Example", singleRecordName: "Example" })
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
