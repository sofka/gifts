export const changingInput = () =>
  document.addEventListener('keypress', event => {
    const input = event.target as HTMLInputElement
    const value = input.value

    if (input && (!value || value.length <= 1)) {
      const newValue = value.charAt(0).toUpperCase() + value.slice(1)
      input.value = newValue
    }
  })
