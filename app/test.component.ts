import { Component, Input, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "test",
  template: `
    {{ value }}
  `
})
export class TestComponent {
  @Input() value: number;
}
