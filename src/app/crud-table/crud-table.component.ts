import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { map, Observable, tap } from "rxjs";
import { CrudService } from "./data-access/crud.service";
import { CrudTableBodyComponent } from "./ui/crud-table-body/crud-table-body.component";
import { CrudTableHeaderComponent } from "./ui/crud-table-header/crud-table-header.component";
import { CrudTableModalComponent } from "./ui/crud-table-modal/crud-table-modal.component";
import { CrudTableModel } from "./utils/models/crud-table.model";
import { DynamicPipe } from "./utils/pipes/dynamic.pipe";

@Component({
  selector: "app-crud-table",
  templateUrl: "./crud-table.component.html",
  styleUrls: ["./crud-table.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    CrudTableHeaderComponent,
    CrudTableBodyComponent,
    DynamicPipe,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    DynamicDialogModule,
  ],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class CrudTableComponent<Model extends CrudTableModel> {
  @Input() modelClass!: Model;
  @Input() service!: CrudService<Model>;

  loading = false;
  rows = 5;
  values!: Observable<Model[]>;
  totalRecords = 0;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    this.values = this.service.lazyList(event).pipe(
      tap((response) => {
        this.totalRecords = response.totalItems;
      }),
      map((response) => response.items),
      tap(() => (this.loading = false))
    );
  }

  newRow() {
    this.dialogService.open(CrudTableModalComponent, {
      closable: false,
      closeOnEscape: false,
      header: `Nueva ${this.modelClass.TableDefinition.singleRecordName}`,
      data: { value: this.modelClass, service: this.service },
    });
  }

  editRow(value: Model) {
    this.dialogService.open(CrudTableModalComponent, {
      header: `Editar "${value.Label}"`,
      data: { value, service: this.service },
    });
  }

  deleteRow(row: Model) {
    this.confirmationService.confirm({
      header: `Eliminar "${row.Label}"`,
      message: "¿Seguro que querés eliminar este registro?",
      acceptButtonStyleClass: "p-button-danger",
      acceptLabel: "Sí",
      rejectButtonStyleClass: "p-button-info",
      rejectLabel: "No",
      accept: () => {
        this.loading = true;
        this.service.delete(row.id).subscribe({
          complete: () => {
            this.messageService.add({
              severity: "success",
              summary: "Éxito",
              detail: `"${row.Label}" eliminado con éxito`,
            });
            this.loading = false;
          },
          error: (e) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Error al borrar el registro, intente de nuevo.",
            });
            console.log(
              `Error al borrar ${this.modelClass.TableDefinition.title}: `,
              e
            );
            this.loading = false;
          },
        });
      },
    });
  }
}
