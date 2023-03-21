import { HttpClientModule } from "@angular/common/http";
import { NgModule, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRouting } from "./login.routing";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { InputComponent } from "src/app/components/input/input.component";

@NgModule({
  declarations: [LoginComponent, InputComponent],
  imports: [
    CommonModule,
    LoginRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApiService],
})
export class LoginModule {}
