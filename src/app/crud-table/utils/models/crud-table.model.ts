import "reflect-metadata";
import {
  columnMetadataKey,
  modelPropertiesMetadataKey,
} from "../decorators/column.decorator";
import { modelIdentityMetadataKey } from "../decorators/identity.decorator";
import { modelLabelMetadataKey } from "../decorators/label.decorator";
import {
  TableDefinition,
  tableTitleMetadataKey,
} from "../decorators/table.decorator";
import { ColumnDefinition, ColumnOptions } from "./column-options.model";

export class CrudTableModel {
  [key: string]: any;

  public get id(): string {
    const key = Reflect.getMetadata(
      modelIdentityMetadataKey,
      this.constructor,
      modelIdentityMetadataKey
    );
    return key ? (this as any)[key] : "";
  }

  public get TableDefinition(): TableDefinition {
    return Reflect.getMetadata(tableTitleMetadataKey, this.constructor);
  }

  public get Label(): string {
    const key = Reflect.getMetadata(
      modelLabelMetadataKey,
      this.constructor,
      modelLabelMetadataKey
    );
    return key ? (this as any)[key] : "";
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

  public get ColumnsDefinitions(): ColumnDefinition[] {
    const properties: string[] = this.Properties;

    return properties.map((property) => this.getColumnDefinition(property));
  }

  public get Properties(): string[] {
    return Reflect.getMetadata(modelPropertiesMetadataKey, this);
  }
}
