
export interface user {
  _id?: string; // Optional if you have an _id from backend
  fullname: string;
  email: string;
  password?: string; // Exclude password from frontend model for security
  phone?: number;
  role?: 'user' | 'admin'; // Make it optional if needed
  gender: string;
  createdAt?: Date; // Optional if you need timestamp
  updatedAt?: Date; // Optional if you need timestamp
}