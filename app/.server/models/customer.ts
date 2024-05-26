export interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  contactNumber: string | null;
}

export interface CustomerCommand {
  name: string;
  email: string;
  address: string;
  contactNumber: string | null;
}
