"use client"

import * as React from "react"
import { ptBR } from 'date-fns/locale'

import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      {...props}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        today: "text-thirdary",
        selected: "text-white bg-primary rounded-md",
        chevron: "text-primary",
      }}
      captionLayout="dropdown"
      locale={ptBR}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
