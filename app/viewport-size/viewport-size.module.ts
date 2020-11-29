import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IfViewportSizeDirective } from "./if-viewport-size.directive";
import { ViewportSizeService } from "./viewport-size.service";
import { IConfig } from "./models/iconfig";

export const CONFIG_TOKEN = new InjectionToken<IConfig>(
  "unique.string.for.config"
);

@NgModule({
  imports: [CommonModule],
  declarations: [IfViewportSizeDirective],
  exports: [IfViewportSizeDirective]
})
export class ViewportSizeModule {
  constructor(@Optional() @SkipSelf() viewportSizeModule: ViewportSizeModule) {
    if (viewportSizeModule) {
      throw new Error(
        "ViewportSizeModule is already loaded. Import it in the AppModule only"
      );
    }
  }

  static forRoot(cfg: IConfig): ModuleWithProviders {
    return {
      ngModule: ViewportSizeModule,
      providers: [{ provide: CONFIG_TOKEN, useValue: cfg }, ViewportSizeService]
    };
  }
}
