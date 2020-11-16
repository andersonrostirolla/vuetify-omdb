function debounce (fn, delay) {
  let timeoutId
  return function () {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

export default debounce