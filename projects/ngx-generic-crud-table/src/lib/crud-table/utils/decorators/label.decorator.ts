import 'reflect-metadata';
import { CrudTableModel } from '../models/crud-table.model';

export const modelLabelMetadataKey = Symbol('label');

export const Label = () => (target: CrudTableModel, key: string) => {
  Reflect.defineMetadata(
    modelLabelMetadataKey,
    key,
    target.constructor,
    modelLabelMetadataKey
  );
};
