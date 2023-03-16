import { FilterMatchMode } from 'primeng/api';

export interface FilterMeta {}

export const FilterMatchModes: any = {
  [FilterMatchMode.EQUALS || FilterMatchMode.DATE_IS || FilterMatchMode.IS]:
    '=',
  [FilterMatchMode.NOT_EQUALS ||
  FilterMatchMode.DATE_IS_NOT ||
  FilterMatchMode.IS_NOT]: '!=',
  [FilterMatchMode.GREATER_THAN || FilterMatchMode.AFTER]: '>',
  [FilterMatchMode.GREATER_THAN_OR_EQUAL_TO]: '>=',
  [FilterMatchMode.LESS_THAN || FilterMatchMode.BEFORE]: '<',
  [FilterMatchMode.LESS_THAN_OR_EQUAL_TO]: '<=',
  [FilterMatchMode.CONTAINS]: '~',
  [FilterMatchMode.NOT_CONTAINS]: '!~',
  [FilterMatchMode.STARTS_WITH]: '~ %',
  [FilterMatchMode.IN]: '?=',
};
