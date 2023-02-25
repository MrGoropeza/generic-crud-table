import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CrudTableComponent } from "../crud-table/crud-table.component";
import { ExampleModel } from "./example.model";

@Component({
  selector: "app-example",
  template: `
    <app-crud-table
      [values]="exampleValues"
      [modelClass]="modelClass"
    ></app-crud-table>
  `,
  standalone: true,
  imports: [CommonModule, CrudTableComponent],
})
export class ExampleComponent implements OnInit {
  modelClass = new ExampleModel();

  exampleValues: ExampleModel[] = [];

  ngOnInit(): void {
    this.exampleValues = Array<ExampleModel>(15).fill(
      Object.assign(new ExampleModel(), {
        id: 1,
        firstName: "Gonzalo",
        lastName: "Oropeza",
        email: "goropeza8@gmail.com",
        birthDay: Date.now(),
        percent: 1.55555555,
        price: 4999.9,
      })
    );
  }
}
