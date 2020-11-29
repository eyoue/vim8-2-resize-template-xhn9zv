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
import { ConfigService } from "./config.service";
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
    private cd: ChangeDetectorRef,
    private resizeService: ViewportSizeService,
    private configService: ConfigService
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
    const config = this.configService.config;
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

    if (prop != "default") {
      this.resizeService.createdCount++;
    } else {
      this.resizeService.createdCount > 0 && this.resizeService.createdCount--;
    }

    const maxRenderByTime = 10;
    const renderTimeout =
      Math.trunc(this.resizeService.createdCount / maxRenderByTime) * 10;

    this.asyncRender = setTimeout(() => {
      conf[prop]();
      clearTimeout(this.asyncRender);
    }, renderTimeout);
  }

  toggle() {
    if (!this.isCreated) {
      this.create();
      this.resizeService.createdCount++;
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
