export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Client {
  email: string;
  password: string;
  confirmPassword: string;
  address: Address;
}

export interface Address {
  zipCode: string;
  street: string;
  addressNumber: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface AddressResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}