import { Inject, Injectable } from "@angular/core";
import { IConfig } from "./models/iconfig";
import { CONFIG_TOKEN } from "./viewport-size.module";

@Injectable()
export class ConfigService {
  config: IConfig;
  constructor(@Inject(CONFIG_TOKEN) cfg: IConfig) {
    this.config = cfg;
  }
}
