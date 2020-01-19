export const debounce = (func: any, delay: number) => {
  let timeoutId: number;
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(func, delay)
  }
}