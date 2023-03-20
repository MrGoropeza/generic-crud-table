/*
 * Public API Surface of ngx-generic-crud-table
 */

// Decorators
export { Column } from "src/app/crud-table/utils/decorators/column.decorator";
export { Identity } from "src/app/crud-table/utils/decorators/identity.decorator";
export { Label } from "src/app/crud-table/utils/decorators/label.decorator";
export { Search } from "src/app/crud-table/utils/decorators/search.decorator";
export { Table } from "src/app/crud-table/utils/decorators/table.decorator";
// Components & Services
export * from "./lib/crud-table/crud-table.component";
export * from "./lib/crud-table/data-access/crud.service";
// Models
export * from "./lib/crud-table/utils/models/column-options.model";
export * from "./lib/crud-table/utils/models/crud-table.model";
export * from "./lib/crud-table/utils/models/filter-meta.model";
export * from "./lib/crud-table/utils/models/multiple-records-response.model";
export * from "./lib/crud-table/utils/models/sort.enum";
