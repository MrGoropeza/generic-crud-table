import { DatePipe, TitleCasePipe } from "@angular/common";
import { CrudTableModel } from "../crud-table/utils/crud-table.model";
import { Column } from "../crud-table/utils/decorators/column.decorator";
import { ModelIdentity } from "../crud-table/utils/decorators/identity.decorator";

export class ExampleModel extends CrudTableModel {
  @ModelIdentity() id?: number;

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

  // @Column({ header: "Porcentaje", pipe: PercentPipe, pipeArgs: ["1.0-4"] })
  // percent?: number;

  // @Column({
  //   header: "Precio",
  //   pipe: CurrencyPipe,
  //   pipeArgs: ["ARS", "code", "1.0-2"],
  // })
  // price?: number;
}
