import "reflect-metadata";
import {
  columnMetadataKey,
  modelPropertiesMetadataKey,
} from "../decorators/column.decorator";
import { tableTitleMetadataKey } from "../decorators/table-title.decorator";
import { ColumnDefinition, ColumnOptions } from "./column-options.model";

export class CrudTableModel {
  getTableTitle(): string {
    return Reflect.getMetadata(tableTitleMetadataKey, this.constructor);
  }

  getColumnDefinition(propertyKey: string): ColumnDefinition {
    const columnOptions: ColumnOptions = Reflect.getMetadata(
      columnMetadataKey,
      this,
      propertyKey
    );

    return {
      ...columnOptions,
      sortable: columnOptions.sortable ?? true,
      pipeArgs: columnOptions.pipeArgs ?? [],
      propertyKey: propertyKey,
    };
  }

  getColumnsDefinitions(): ColumnDefinition[] {
    const properties: string[] = Reflect.getMetadata(
      modelPropertiesMetadataKey,
      this
    );

    return properties.map((property) => this.getColumnDefinition(property));
  }
}
