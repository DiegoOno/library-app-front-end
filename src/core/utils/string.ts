export const removeSpecialCharacters = (str: string) => {
  if (!str) return str
  return str.replace(/[^a-zA-Z0-9\s]/g, '').trim()
}
