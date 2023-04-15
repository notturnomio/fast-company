export function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
    case "EMAIL_NOT_FOUND":
      return "Invalid e-mail or password";
    case "EMAIL_EXISTS":
      return "User with this email already exists";
    default:
      return "Too many attempts. Try again later";
  }
}
