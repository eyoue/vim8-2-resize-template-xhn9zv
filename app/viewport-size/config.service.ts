import { Inject, Injectable } from "@angular/core";

export interface IConfig {
  small: number;
  medium: number;
  large: number;
}

@Injectable()
export class ConfigService {
  public config: IConfig;
  constructor(@Inject("CONFIG_TOKEN") private cfg: IConfig) {
    this.config = this.cfg;
  }
}
