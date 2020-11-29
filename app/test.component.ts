import { Component, Input, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "test",
  template: `
    {{ value }}
  `
})
export class TestComponent implements OnInit, OnDestroy {
  @Input() value: number;

  ngOnInit() {
    console.log("init");
  }

  ngOnDestroy() {
    console.log("destroy");
  }
}
