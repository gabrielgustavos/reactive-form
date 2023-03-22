import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/core/guard/auth.service'
import { ApiService } from 'src/app/core/http/api.service'
import { User } from 'src/app/shared/interface/form'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _formData: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  private _loading = false

  usuarios: User[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {}

  get formData(): FormGroup {
    return this._formData
  }

  get loading(): boolean {
    return this._loading
  }

  set loading(value: boolean) {
    this._loading = value
  }

  onSubmit(): void {
    this.loading = true

    this.apiService.getData().subscribe((res: any) => {
      console.log(res)
      this.usuarios = res
      const valid = this.validateForm()
      this.loading = false
      if (valid) {
        this.router.navigate(['/admin'])
      }
    })
  }

  validateForm(): boolean {
    const email = this.formData.get('email')?.value
    const password = this.formData.get('password')?.value
    const foundUser = this.usuarios.some(
      (item: User) => item.email === email && item.password === password,
    )

    if (foundUser) {
      this.authService.setAuthenticated(true)
      this.authService.setAdmin(true)
      return true
    } else {
      this.formData.reset()
      alert('Email ou senha incorretos')
      return false
    }
  }

  goToRegister(): void {
    this.router.navigate(['/registro'])
  }
}
