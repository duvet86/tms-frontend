export interface Vendor {
  id: number;
  name: string;
  email: string;
  address: string;
  contactNumber: string | null;
}

export interface VendorCommand {
  name: string;
  email: string;
  address: string;
  contactNumber: string | null;
}
