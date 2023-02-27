import { Type } from "@angular/core";

export interface ColumnOptions {
  header: string;
  sortable?: boolean;
  pipe?: Type<any>;
  pipeArgs?: any[];
}

export interface ColumnDefinition extends ColumnOptions {
  propertyKey: string;
}
