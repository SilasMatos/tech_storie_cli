// utils/formatName.ts
export const formatName = (fullName: string): string => {
  const names = fullName.split(' ')
  if (names.length < 2) return fullName

  const firstName = names[0]
  const lastName = names[names.length - 1]

  return `${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`
}