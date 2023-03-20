import { Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStateInit,
  tapResponse,
} from "@ngrx/component-store";
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { exhaustMap, mergeMap, Observable, of, switchMap, tap } from "rxjs";
import { CrudTableModalComponent } from "../ui/crud-table-modal/crud-table-modal.component";
import { CrudTableModel } from "../utils/models/crud-table.model";
import { CrudService } from "./crud.service";

export interface CrudTableState<Model extends CrudTableModel> {
  records: Model[];
  totalRecords: number;
  loading: boolean;
  rows: number;
}

@Injectable()
export class CrudTableStore<Model extends CrudTableModel>
  extends ComponentStore<CrudTableState<Model>>
  implements OnStateInit
{
  readonly vm$ = this.select({
    records: this.select((state) => state.records),
    totalRecords: this.select((state) => state.totalRecords),
    loading: this.select((state) => state.loading),
    rows: this.select((state) => state.rows),
  });

  service!: CrudService<Model>;
  modelClass!: Model;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {
    super();
  }

  ngrxOnStateInit() {}

  readonly onLazyLoad = this.effect((event$: Observable<LazyLoadEvent>) =>
    event$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((event) =>
        this.service.lazyList(event).pipe(
          tapResponse(
            (response) => {
              this.patchState({
                records: response.items,
                totalRecords: response.totalItems,
                loading: false,
              });
            },
            (error) => this.onError({ message: JSON.stringify(error), error })
          )
        )
      )
    )
  );

  readonly newRow = this.effect((obs$: Observable<void>) =>
    obs$.pipe(
      exhaustMap(() =>
        of(
          this.dialogService.open(CrudTableModalComponent, {
            closable: false,
            closeOnEscape: false,
            header: `Crear ${
              this.modelClass!.TableDefinition.singleRecordName
            }`,
            data: { value: this.modelClass, service: this.service },
          })
        )
      )
    )
  );

  readonly editRow = this.effect((value$: Observable<Model>) =>
    value$.pipe(
      exhaustMap((value) =>
        of(
          this.dialogService.open(CrudTableModalComponent, {
            header: `Editar "${value.Label}"`,
            data: { value, service: this.service },
          })
        )
      )
    )
  );

  readonly deleteRow = this.effect((value$: Observable<Model>) =>
    value$.pipe(
      exhaustMap((value) =>
        of(
          this.confirmationService.confirm({
            key: "crud-table-confirm-dialog",
            header: `Eliminar "${value.Label}"`,
            message: "¿Seguro que querés eliminar este registro?",
            acceptButtonStyleClass: "p-button-danger",
            acceptLabel: "Sí",
            rejectButtonStyleClass: "p-button-info",
            rejectLabel: "No",
            accept: () => {
              this.patchState({ loading: true });
              this.service.delete(value.id).subscribe({
                complete: () => {
                  this.onSuccess(`"${value.Label}" eliminado con éxito`);
                  this.patchState({ loading: false });
                },
                error: (error) => {
                  this.onError({
                    message: "Error borrando registro, intente de nuevo.",
                    error,
                  });
                  this.patchState({ loading: false });
                },
              });
            },
          })
        )
      )
    )
  );

  readonly onError = this.effect(
    (error$: Observable<{ message: string; error: unknown }>) =>
      error$.pipe(
        tap(({ error }) => console.log(error)),
        mergeMap(({ message }) =>
          of(
            this.messageService.add({
              key: "crud-table-toast",
              severity: "error",
              summary: "Error",
              detail: message,
            })
          )
        )
      )
  );

  readonly onSuccess = this.effect((success: Observable<string>) =>
    success.pipe(
      mergeMap((success) =>
        of(
          this.messageService.add({
            key: "crud-table-toast",
            severity: "success",
            summary: "Éxito",
            detail: success,
          })
        )
      )
    )
  );
}
