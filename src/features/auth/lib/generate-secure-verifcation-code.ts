export function generateSecureVerificationCode() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0]! % 1000000).padStart(6, "0");
}
