import { Pipe } from "@angular/core";
import "reflect-metadata";
import {
  modelPropertiesMetadataKey,
  registerProperty,
} from "./model-properties.decorator";

const columnMetadataKey = Symbol("column");

interface ColumnOptions {
  header: string;
  sortable?: boolean;
  pipe?: Pipe;
  pipeArgs?: any[];
}

export interface ColumnDefinition extends ColumnOptions {
  value: string;
}

export function Column(opts: ColumnOptions) {
  return (target: any, propertyKey: string): void => {
    Reflect.defineMetadata(columnMetadataKey, opts, target, propertyKey);
    registerProperty(target, propertyKey);
  };
}

export function getColumnDefinition(
  target: any,
  propertyKey: string
): ColumnDefinition {
  const columnOptions: ColumnOptions = Reflect.getMetadata(
    columnMetadataKey,
    target,
    propertyKey
  );

  return {
    ...columnOptions,
    sortable: columnOptions.sortable ?? true,
    pipeArgs: columnOptions.pipeArgs ?? [],
    value: propertyKey,
  };
}

export function getColumnsDefinitions(target: any) {
  const properties: string[] = Reflect.getMetadata(
    modelPropertiesMetadataKey,
    target
  );

  return properties.map((property) => getColumnDefinition(target, property));
}
