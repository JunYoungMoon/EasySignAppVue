export default interface AuthInterface {
  accessToken: string;
  refreshToken: string;
  refreshTokenRequired: boolean;
  csrfToken: string;
  // Add other properties as needed
}
