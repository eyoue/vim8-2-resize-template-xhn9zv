import { Inject, Injectable } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { IConfig } from "./models/iconfig";
import { CONFIG_TOKEN } from "./viewport-size.module";

@Injectable()
export class ViewportSizeService {
  config: IConfig;

  constructor(@Inject(CONFIG_TOKEN) cfg: IConfig) {
    this.config = cfg;
  }

  count: number = 0;

  get onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable();
  }

  private resizeSubject: Subject<Window>;

  constructor(private eventManager: EventManager) {
    this.resizeSubject = new Subject();
    this.eventManager.addGlobalEventListener(
      "window",
      "resize",
      this.onResize.bind(this)
    );
  }

  private onResize(event: UIEvent) {
    this.resizeSubject.next(<Window>event.target);
  }
}
