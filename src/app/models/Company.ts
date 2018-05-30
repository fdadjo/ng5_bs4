/**
 * Created by i.tankoua on 27/04/2016.
 */
export interface Company {
  id: string;
  name: string;
  billingInfo: BillingInfo;
  address: Address;
}

export interface BillingInfo {
  id: string;
  vat: string;
  siret: string;
  bank: [Bank];
}

export interface Bank {
  id: string;
  account: string;
  swiftCode: string;
}

export interface Address {
  id: string;
  country: string;
  countryCode: string;
  postalCode: string;
  street: string;
}
