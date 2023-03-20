import { Injector, Pipe, PipeTransform, Type } from "@angular/core";

@Pipe({
  name: "dynamicPipe",
  standalone: true,
})
export class DynamicPipe implements PipeTransform {
  constructor(private injector: Injector) {}

  transform(value: any, requiredPipe: Type<PipeTransform>, args?: any[]): any {
    const injector = Injector.create({
      name: "DynamicPipe",
      parent: this.injector,
      providers: [{ provide: requiredPipe }],
    });
    const pipe = injector.get(requiredPipe);
    if (args) {
      return pipe.transform(value, ...args);
    } else {
      return pipe.transform(value);
    }
  }
}
