import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { PublicRoutingModule } from './public-routing.module'
import { RegisterComponent } from './login/register/register.component'
import { InputComponent } from 'src/app/shared/components/input/input.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ApiService } from 'src/app/core/http/api.service'
import { AuthGuard } from 'src/app/core/guard/auth.guard'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

@NgModule({
  declarations: [LoginComponent, RegisterComponent, InputComponent, ButtonComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApiService],
})
export class PublicModule {}
