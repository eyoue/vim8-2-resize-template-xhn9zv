import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TestComponent } from "./test.component";
import { ViewportSizeModule } from "./viewport-size/viewport-size.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ViewportSizeModule.forRoot({
      small: 400,
      medium: 450,
      large: 500
    })
  ],
  declarations: [AppComponent, HelloComponent, TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
