export interface Contact {
  _id?: string; // Optional if you have an _id from backend
  fullname_contact: string;
  email: string;
  phone?: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}
