import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PublicComponent } from "./public.component";
import { LoginComponent } from "./login/login.component";
import { PublicRouting } from "./public.routing";

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    RouterModule,
    PublicRouting,
  ],
})
export class PublicModule {}
