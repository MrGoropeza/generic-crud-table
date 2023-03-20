import { CrudTableModel } from "./crud-table.model";

export interface MultipleRecordsResponse<Model extends CrudTableModel> {
  items: Model[];
  totalItems: number;
}
