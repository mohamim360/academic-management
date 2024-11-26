import {jwtDecode} from 'jwt-decode';

interface CustomJwtPayload {
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
  role: string; // Role of the user
  userId: string; // User ID
}

export const verifyToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwtDecode<CustomJwtPayload>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
