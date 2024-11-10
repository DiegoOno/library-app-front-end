import { format, parse } from 'date-fns'

export const formatDate = (date: string, currFormat: string, newFormat: string, isCurrentTime?: boolean) => {
  const currentDate = isCurrentTime ? new Date() : null

  const parsedDate = parse(date, currFormat, new Date())

  if (!currentDate) return format(parsedDate, newFormat)

  return format(parsedDate.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()), newFormat)
}
