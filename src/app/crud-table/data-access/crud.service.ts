import { LazyLoadEvent } from "primeng/api";
import { Observable, of } from "rxjs";
import { CrudTableModel } from "../utils/models/crud-table.model";
import { FilterMatchModes } from "../utils/models/filter-meta.model";
import { MultipleRecordsResponse } from "../utils/models/multiple-records-response.model";
import { SortOrder } from "../utils/models/sort.enum";

export abstract class CrudService<Model extends CrudTableModel> {
  modelClass = CrudTableModel;

  constructor(protected globalFilter: string) {}

  lazyList(event: LazyLoadEvent): Observable<MultipleRecordsResponse<Model>> {
    let page = 0;
    let perPage = 5;

    let sort = "";
    let filter = "";

    if (event.first !== undefined && event.rows !== undefined) {
      page = event.first / event.rows + 1;
      perPage = event.rows;
    }

    if (event.sortField && event.sortOrder) {
      sort = `${SortOrder[event.sortOrder]}${event.sortField}`;
    }

    if (event.multiSortMeta) {
      event.multiSortMeta.forEach((sortMeta, index) => {
        if (index === 0) {
          sort += `${SortOrder[sortMeta.order]}${sortMeta.field}`;
        }
      });
    }

    if (event.filters) {
      Object.entries(event.filters).forEach((filterMeta, index) => {
        if (filterMeta[1].matchMode && filterMeta[1].value) {
          filter += `${index > 0 ? filterMeta[1].operator : ""} ${
            filterMeta[0] === "global" ? this.globalFilter : filterMeta[0]
          } ${FilterMatchModes[filterMeta[1].matchMode]} "${
            filterMeta[1].value
          }"`;
        }
      });
    }

    return this.list(page, perPage, sort, filter);
  }

  list(
    page?: number,
    perPage?: number,
    sort?: string,
    filter?: string
  ): Observable<MultipleRecordsResponse<Model>> {
    return of({ items: [], totalItems: 0 });
  }

  listAll(
    sort?: string,
    filter?: string
  ): Observable<MultipleRecordsResponse<Model>> {
    return of({ items: [], totalItems: 0 });
  }

  get(id: string): Observable<Model> {
    return of();
  }

  create(value: Model): Observable<Model> {
    return of();
  }

  update(value: Model): Observable<Model> {
    return of();
  }

  delete(id: string): Observable<boolean> {
    return of();
  }
}
