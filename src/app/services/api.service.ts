import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  CEP_URL = "https://viacep.com.br/ws/";
  constructor(private http: HttpClient) {}

  getCEP(cep: string) {
    return this.http.get(`${this.CEP_URL}/${cep}/json`);
  }
}
