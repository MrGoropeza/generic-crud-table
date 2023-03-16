import { PipeTransform, Type } from "@angular/core";
import { ValidatorFn } from "@angular/forms";

export interface ColumnOptions {
  header: string;
  editType: "text";
  editValidators?: ValidatorFn[];
  sortable?: boolean;
  pipe?: Type<PipeTransform>;
  pipeArgs?: any[];
}

export interface ColumnDefinition extends ColumnOptions {
  propertyKey: string;
}
