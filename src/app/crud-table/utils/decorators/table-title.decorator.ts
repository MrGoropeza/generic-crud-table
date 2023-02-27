import "reflect-metadata";

export const tableTitleMetadataKey = Symbol("tableTitle");

export function TableTitle(title: string) {
  return (target: any): void => {
    Reflect.defineMetadata(tableTitleMetadataKey, title, target);
  };
}
