
export interface user {
  _id?: string; 
  fullname: string;
  email: string;
  password?: string; 
  phone?: number;
  role: 'user' | 'admin'; 
  gender: string;
  createdAt?: Date; 
  updatedAt?: Date; 
}