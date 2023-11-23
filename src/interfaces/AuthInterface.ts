export interface AuthInterface {
  csrfToken: string;
  data: string;
  // Add other properties as needed
}

export interface AuthDataInterface {
  accessToken: string;
  refreshToken: string;
  refreshTokenRequired: boolean;
  // Add other properties as needed
}
