import "reflect-metadata";
import { CrudTableModel } from "../models/crud-table.model";

export const modelIdentityMetadataKey = Symbol("identity");

export const Identity = () => (target: CrudTableModel, key: string) => {
  Reflect.defineMetadata(
    modelIdentityMetadataKey,
    key,
    target.constructor,
    modelIdentityMetadataKey
  );
};
