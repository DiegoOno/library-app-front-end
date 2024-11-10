export const applyMask = (value: string, maskPattern: string): string => {
  let maskedValue = ''
  let valueIndex = 0

  const onlyNumeric = !maskPattern.includes('@')

  if (onlyNumeric && value) {
    value = value?.replace(/\D/g, '')
  }

  for (let i = 0; i < maskPattern.length && valueIndex < value.length; i++) {
    const maskChar = maskPattern[i];
    const inputChar = value[valueIndex]

    if (maskChar === '#') {
      if (/\d/.test(inputChar)) {
        maskedValue += inputChar
        valueIndex++
      }
    } else if (maskChar === '@') {
      if (/[A-Za-z]/.test(inputChar)) {
        maskedValue += inputChar
        valueIndex++
      }
    } else {
      maskedValue += maskChar;
      if (inputChar === maskChar) {
        valueIndex++
      }
    }
  }

  return maskedValue
}
