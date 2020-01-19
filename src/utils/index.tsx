export const debounce = (func: any, delay: number) => {
  var timeoutId: number;
  return () => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(func, delay)
  }
}