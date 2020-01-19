export const email = (input: string) => {
  const regex = /\S+@\S+\.\S+/
  return regex.test(input);
}