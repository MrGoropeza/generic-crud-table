import {
  CurrencyPipe,
  DatePipe,
  PercentPipe,
  TitleCasePipe,
} from "@angular/common";
import { Column } from "../crud-table/utils/decorators/column.decorator";
import { Identity } from "../crud-table/utils/decorators/identity.decorator";
import { TableTitle } from "../crud-table/utils/decorators/table-title.decorator";
import { CrudTableModel } from "../crud-table/utils/models/crud-table.model";

@TableTitle("Example")
export class ExampleModel extends CrudTableModel {
  @Identity() id?: number;

  @Column({ header: "Nombre" }) firstName?: string;

  @Column({ header: "Apellido", pipe: TitleCasePipe })
  lastName?: string;

  @Column({ header: "Email" }) email?: string;

  @Column({
    header: "Fecha de Nacimiento",
    pipe: DatePipe,
    pipeArgs: ["dd/MM/yyyy"],
  })
  birthDay?: string;

  @Column({ header: "Porcentaje", pipe: PercentPipe, pipeArgs: ["1.0-4"] })
  percent?: number;

  @Column({
    header: "Precio",
    pipe: CurrencyPipe,
    pipeArgs: ["ARS ", "code", "1.0-2"],
  })
  price?: number;
}
