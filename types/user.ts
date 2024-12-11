export interface User {
    id?: number;
    name: string;
    email: string;
    age: number;
    createdAt?: Date;
  }
  
  export interface UserCreateInput extends Omit<User, 'id' | 'createdAt'> {}
  
  export interface UserUpdateInput extends Partial<UserCreateInput> {}