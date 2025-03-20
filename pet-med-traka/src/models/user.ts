export interface User {
    id: string; // Unique identifier for the user
    name: string; // User's name
    email: string; // User's email (unique)
    password: string; // Hashed password
    role: 'admin' | 'user'; // User role
    createdAt: Date; // Timestamp when the user was created
    updatedAt: Date; // Timestamp when the user was last updated
  }