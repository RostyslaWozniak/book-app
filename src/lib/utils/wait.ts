export function wait(ms = 3000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
