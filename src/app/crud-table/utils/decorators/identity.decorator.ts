import "reflect-metadata";
import { CrudTableModel, modelIdentityMetadataKey } from "../crud-table.model";

export const ModelIdentity = () => (target: CrudTableModel, key: string) => {
  Reflect.defineMetadata(
    modelIdentityMetadataKey,
    key,
    target.constructor,
    modelIdentityMetadataKey
  );
};
