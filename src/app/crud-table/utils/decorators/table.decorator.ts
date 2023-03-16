import "reflect-metadata";

export const tableTitleMetadataKey = Symbol("table");

export interface TableDefinition {
  title: string;
  singleRecordName: string;
  searchPlaceholder?: string;
  rowsPerPage?: number;
}

export function Table(definition: TableDefinition) {
  return (target: any): void => {
    Reflect.defineMetadata(tableTitleMetadataKey, definition, target);
  };
}
