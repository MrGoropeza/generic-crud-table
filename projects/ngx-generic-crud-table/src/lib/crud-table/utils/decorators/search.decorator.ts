import "reflect-metadata";
import { CrudTableModel } from "../models/crud-table.model";

export const modelSearchMetadataKey = Symbol("search");

export const Search = () => (target: CrudTableModel, key: string) => {
  Reflect.defineMetadata(
    modelSearchMetadataKey,
    key,
    target.constructor,
    modelSearchMetadataKey
  );
};
