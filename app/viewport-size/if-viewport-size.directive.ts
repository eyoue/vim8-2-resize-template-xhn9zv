import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";
import { ViewportSizeService } from "./viewport-size.service";

@Directive({
  selector: "[ifViewportSize]"
})
export class IfViewportSizeDirective implements OnInit, OnDestroy {
  @Input("ifViewportSize") size: "small" | "medium" | "large";

  ngUnsubscribe$ = new Subject();
  isCreated = false;
  asyncRender = 0;

  constructor(
    private templateRef: TemplateRef<null>,
    private viewContainerRef: ViewContainerRef,
    private viewportResizeService: ViewportSizeService,
    private cd: ChangeDetectorRef,
    private resizeService: ViewportSizeService
  ) {}

  ngOnInit() {
    this.onResize();
    this.resizeService.onResize$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.onResize());
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    if (this.asyncRender) {
      clearTimeout(this.asyncRender);
    }
  }

  onResize() {
    const getProp = () => {
      const prop =
        viewportWidth < config.medium
          ? "small"
          : config.medium <= viewportWidth && viewportWidth < config.large
          ? "medium"
          : "large";
      return this.size === prop ? prop : "default";
    };
    const config = this.viewportResizeService.config;
    const viewportWidth = window.innerWidth;
    const conf = {
      small: () => this.toggle(),
      medium: () => this.toggle(),
      large: () => this.toggle(),
      default: () => this.dispose()
    };

    const prop = getProp();

    if (this.asyncRender) {
      clearTimeout(this.asyncRender);
    }

    this.asyncRender = setTimeout(() => {
      conf[prop]();
      clearTimeout(this.asyncRender);
    }, 0);
  }

  toggle() {
    if (!this.isCreated) {
      this.create();
    }
  }

  create() {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.isCreated = true;
    if (!this.cd["destroyed"]) {
      this.cd.detectChanges();
    }
  }

  dispose() {
    this.viewContainerRef.clear();
    this.isCreated = false;
    if (!this.cd["destroyed"]) {
      this.cd.detectChanges();
    }
  }
}
