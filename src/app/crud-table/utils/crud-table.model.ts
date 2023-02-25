import "reflect-metadata";
import {
  ColumnDefinition,
  getColumnsDefinitions,
} from "./decorators/column.decorator";

export const modelIdentityMetadataKey = "IDENTITY_META_KEY";

export class CrudTableModel {
  getIdentity() {
    const key = Reflect.getMetadata(
      modelIdentityMetadataKey,
      this.constructor,
      modelIdentityMetadataKey
    );
    return key ? (this as any)[key] : 0;
  }

  setIdentity(value: any) {
    const key: string = Reflect.getMetadata(
      modelIdentityMetadataKey,
      this.constructor,
      modelIdentityMetadataKey
    );
    (this as any)[key] = value;
  }

  getColumnsDefinitions(): ColumnDefinition[] {
    return getColumnsDefinitions(this);
  }
}
