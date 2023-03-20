import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { CrudService } from "../../data-access/crud.service";
import { ColumnDefinition } from "../../utils/models/column-options.model";
import { CrudTableModel } from "../../utils/models/crud-table.model";

@Component({
  selector: "app-crud-table-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="save()">
      <div *ngFor="let field of fields">
        <span class="p-float-label mt-6">
          <input
            pInputText
            type="text"
            [formControlName]="field.propertyKey"
            class="w-full"
            [ngClass]="{
              'ng-invalid ng-dirty':
                formGroup.controls[field.propertyKey].invalid &&
                formGroup.controls[field.propertyKey].touched
            }"
          />
          <label>{{ field.header }}</label>
        </span>
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <button
          type="button"
          pButton
          class="p-button-info"
          label="Cancelar"
          icon="pi pi-times"
          (click)="ref.close()"
          [loading]="loading"
        ></button>
        <button
          type="submit"
          pButton
          class="p-button-success"
          label="Guardar"
          icon="pi pi-save"
          [loading]="loading"
        ></button>
      </div>
    </form>
    <!-- <pre>{{ formGroup.getRawValue() | json }}</pre> -->
  `,
})
export class CrudTableModalComponent<Model extends CrudTableModel>
  implements OnInit
{
  formGroup!: FormGroup;
  service!: CrudService<Model>;
  fields!: ColumnDefinition[];
  loading = false;

  constructor(
    fb: FormBuilder,
    private messageService: MessageService,
    protected ref: DynamicDialogRef,
    protected config: DynamicDialogConfig<{
      value: Model;
      service: CrudService<Model>;
    }>
  ) {
    if (config.data) {
      this.service = config.data.service;
      this.fields = config.data.value.ColumnsDefinitions;
      const controls = this.fields.reduce(
        (prev, value) => ({
          ...prev,
          [value.propertyKey]: [
            null,
            Validators.compose(value.editValidators ?? []),
          ],
        }),
        { id: config.data.value.id }
      );
      this.formGroup = fb.group(controls);
    }
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.formGroup.patchValue(this.config.data.value);
    }
  }

  save() {
    this.loading = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      this.loading = false;
      return;
    }

    if (this.config.data?.value.id) {
      this.service.update(this.formGroup.getRawValue()).subscribe({
        complete: () => {
          this.messageService.add({
            key: "crud-table-toast",
            severity: "success",
            summary: "Éxito",
            detail: `Registro actualizado con éxito`,
          });
          this.loading = false;
          this.ref.close();
        },
        error: (e) => {
          this.messageService.add({
            key: "crud-table-toast",
            severity: "error",
            summary: "Error",
            detail: "Error al actualizar el registro, intente de nuevo.",
          });
          console.log(
            `Error al crear ${this.config.data?.value.TableDefinition.title}: `,
            e.data
          );
          this.loading = false;
        },
      });
    } else {
      this.service.create(this.formGroup.getRawValue()).subscribe({
        complete: () => {
          this.messageService.add({
            key: "crud-table-toast",
            severity: "success",
            summary: "Éxito",
            detail: `Registro creado con éxito`,
          });
          this.loading = false;
          this.ref.close();
        },
        error: (e) => {
          this.messageService.add({
            key: "crud-table-toast",
            severity: "error",
            summary: "Error",
            detail: "Error al crear el registro, intente de nuevo.",
          });
          console.log(
            `Error al crear ${this.config.data?.value.TableDefinition.title}: `,
            e.data
          );
          this.loading = false;
        },
      });
    }
  }
}
