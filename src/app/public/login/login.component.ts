import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { lowerCaseValidator } from "src/app/services/form-validation.service";
import { Client } from "src/app/shared/client";

@Component({
  selector: "app-login",

  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  formData!: FormGroup;
  loading = false;
  private subscription$: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.createForm(new Client());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  createForm(client: Client): void {
    this.formData = this.fb.group({
      userName: [client.userName, [Validators.required, lowerCaseValidator]],
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
    });
  }

  patchAddress(event: Event): void {
    this.loading = true;

    const zipCode = (event.target as HTMLInputElement).value;
    this.subscription$ = this.apiService.getCEP(zipCode).subscribe(
      (address: any) => {
        this.formData.patchValue({
          address: {
            street: address.logradouro,
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf,
          },
        });
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  maskCEP(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    (event.target as HTMLInputElement).value = value;
  }

  onSubmit(): void {
    const zipCode = this.formData.get("address.zipCode")?.value;
    this.subscription$ = this.apiService
      .getCEP(zipCode)
      .subscribe((address: any) => {
        console.log(address);
      });
  }
}
