import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ApiService } from 'src/app/core/http/api.service'
import { Client } from 'src/app/shared/model/client'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formData!: FormGroup
  loading = false
  private subscription$: Subscription = new Subscription()

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm(new Client())
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  createForm(client: Client): void {
    this.formData = this.fb.group({
      email: [client.email, [Validators.required, Validators.email]],
      password: [
        client.password,
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: [
        client.confirmPassword,
        [Validators.required, Validators.minLength(6)],
      ],
      address: this.fb.group({
        zipCode: [client.zipCode, [Validators.required]],
        street: [client.address, [Validators.required]],
        addressNumber: [client.addressNumber, [Validators.required]],
        neighborhood: [client.neighborhood, [Validators.required]],
        city: [client.city, [Validators.required]],
        state: [client.state, [Validators.required]],
      }),
    })
  }

  patchAddress(event: Event): void {
    this.loading = true

    const zipCode = (event.target as HTMLInputElement).value
    this.subscription$ = this.apiService.getCEP(zipCode).subscribe(
      (address: any) => {
        this.formData.patchValue({
          address: {
            street: address.logradouro,
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf,
          },
        })
        this.loading = false
      },
      (error) => {
        console.error(error)
        this.loading = false
      },
    )
  }

  maskCEP(event: Event): void {
    let value = (event.target as HTMLInputElement).value
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{5})(\d)/, '$1-$2')
    ;(event.target as HTMLInputElement).value = value
  }

  onSubmit(): void {
    if (this.formData.valid) {
      const email = this.formData.get('email')?.value
      const password = this.formData.get('password')?.value
      const login = { email, password }

      this.subscription$ = this.apiService
        .postDataLogin(login)
        .subscribe((data) => {
          console.log(data)

          const client: Client = this.formData.value
          this.subscription$ = this.apiService
            .postData(client)
            .subscribe(() => {
              this.router.navigate(['/login'])
            })
        })
    } else {
      alert('Formulário inválido')
    }
  }
}
