import "reflect-metadata";
import { ColumnOptions } from "../models/column-options.model";

export const modelPropertiesMetadataKey = Symbol("modelProperties");
export const columnMetadataKey = Symbol("column");

export function Column(opts: ColumnOptions) {
  return (target: any, propertyKey: string): void => {
    Reflect.defineMetadata(columnMetadataKey, opts, target, propertyKey);
    registerProperty(target, propertyKey);
  };
}

const registerProperty = (target: any, propertyKey: string): void => {
  let properties: string[] = Reflect.getMetadata(
    modelPropertiesMetadataKey,
    target
  );

  if (properties) {
    properties.push(propertyKey);
  } else {
    properties = [propertyKey];
    Reflect.defineMetadata(modelPropertiesMetadataKey, properties, target);
  }
};
