export const debounce = (func: any, delay: number) => {
  var timeoutId: number;
  return () => {
    console.info(timeoutId)
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(func, delay)
  }
}